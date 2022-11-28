// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

type Team = {
  id: string;
  title: string;
  flagUrl: string;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  participant: {
    id: string;
    name: string;
    email: string;
  }
  points: number;
}

type GameData = {
  id: string;
  date: string;
  firstTeamPoints?: number;
  secondTeamPoints?: number;
  teams: Team[];
  guesses: Guess[];
}

type Data = {
  game: GameData;
}

const gamesById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    const { id } = req.query;

    await graphql.request(`
      query GetGameById($id: ID!) {
        game(where: {id: $id}) {
          id
          date
          firstTeamPoints
          secondTeamPoints
          teams {
            id
            title
            flagUrl
          }
          guesses(orderBy: createdAt_ASC) {
            id
            firstTeamPoints
            secondTeamPoints
            participant {
              id
              name
              email
            }
          }
        }
      }
    `, {
      id
    }).then((data: Data) => {
      if (data.game.firstTeamPoints !== null && data.game.secondTeamPoints !== null) {
        data.game.guesses.forEach(async (guess: Guess) => {
          if (guess.firstTeamPoints === data.game.firstTeamPoints && guess.secondTeamPoints === data.game.secondTeamPoints) {
            // Add score to the points variable
            guess.points = 15;
          } else if ((guess.firstTeamPoints > guess.secondTeamPoints && data.game.firstTeamPoints > data.game.secondTeamPoints) && guess.firstTeamPoints === data.game.firstTeamPoints) {
            guess.points = 10;
          } else if (guess.firstTeamPoints === guess.secondTeamPoints && data.game.firstTeamPoints === data.game.secondTeamPoints) {
            guess.points = 8;
          } else if ((guess.firstTeamPoints > guess.secondTeamPoints && data.game.firstTeamPoints > data.game.secondTeamPoints) || (guess.firstTeamPoints < guess.secondTeamPoints && data.game.firstTeamPoints < data.game.secondTeamPoints)) {
            guess.points = 5;
          } else {
            guess.points = 0;
          }
        });
      }

      res.status(200).json(data);
    });
  }
}

export default gamesById;

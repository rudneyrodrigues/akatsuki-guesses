import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";

type Game = {
  firstTeamPoints: number;
  secondTeamPoints: number;
}

type Guess = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  game: Game;
  points: number;
}

type Participants = {
  id: string;
  name: string;
  email: string;
  guesses: Guess[]
}

interface Data {
  participants: Participants[]
}

const users = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    await graphql.request(`
      query GetAllParticipants {
        participants {
          id
          name
          email
          guesses {
            id
            firstTeamPoints
            secondTeamPoints
            game {
              firstTeamPoints
              secondTeamPoints
            }
          }
        }
      }
    `).then((data: Data) => {
      // Add score to the points variable
      data.participants.forEach(participant => {
        participant.guesses.forEach(guess => {
          if (guess.firstTeamPoints === guess.game.firstTeamPoints && guess.secondTeamPoints === guess.game.secondTeamPoints) {
            // Add score to the points variable
            guess.points = 15;
          } else if ((guess.firstTeamPoints > guess.secondTeamPoints && guess.game.firstTeamPoints > guess.game.secondTeamPoints) && guess.firstTeamPoints === guess.game.firstTeamPoints) {
            guess.points = 10;
          } else if (guess.firstTeamPoints === guess.secondTeamPoints && guess.game.firstTeamPoints === guess.game.secondTeamPoints) {
            guess.points = 8;
          } else if ((guess.firstTeamPoints > guess.secondTeamPoints && guess.game.firstTeamPoints > guess.game.secondTeamPoints) || (guess.firstTeamPoints < guess.secondTeamPoints && guess.game.firstTeamPoints < guess.game.secondTeamPoints)) {
            guess.points = 5;
          } else {
            guess.points = 0;
          }
        })
      });

      return res.status(200).json({ participants: data.participants });
    })
  }
}

export default users;

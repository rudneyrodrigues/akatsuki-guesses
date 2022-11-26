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
  games: GameData;
}

const phases = async (
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
    }).then(data => {
      res.status(200).json(data);
    });
  }
}

export default phases;

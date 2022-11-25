// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

type Teams = {
  title: string;
  flagUrl: string;
}

type GuessesData = {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  game: {
    id: string;
    date: string;
    teams: Teams[];
  }
}

type Data = {
  guesses: GuessesData[];
}

const guesses = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    const { email } = req.query;

    await graphql.request(`
      query GetGuessesByEmail($email: String!) {
        guesses(where: {participant: {email: $email}}) {
          id
          firstTeamPoints
          secondTeamPoints
          game {
            id
            date
            teams {
              title
              flagUrl
            }
          }
        }
      }
    `, {
      email: email
    }).then(data => {
      res.status(200).json(data);
    });
  }
}

export default guesses;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

type TeamsData = {
  id: string;
  title: string;
  flagUrl: string;
}

type GamesData = {
  id: string;
  date: string;
  teams: TeamsData[];
}

type Data = {
  games: GamesData[];
}

const phases = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    const { id } = req.query;

    await graphql.request(`
      query GetAllGamesByPhase($id: ID!) {
        games(where: {phase: {id: $id}}, orderBy: date_ASC) {
          id
          date
          teams {
            id
            title
            flagUrl
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

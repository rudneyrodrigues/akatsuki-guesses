// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

type PhasesData = {
  id: string;
  title: string;
}

type Data = {
  phases: PhasesData[];
}

const phases = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    await graphql.request(`
      query GetAllPhases {
        phases(stage: PUBLISHED) {
          id
          title
        }
      }
    `).then(data => {
      res.status(200).json(data);
    });
  }
}

export default phases;

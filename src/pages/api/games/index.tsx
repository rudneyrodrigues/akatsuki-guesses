import { GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

type Team = {
  title: string;
  flagUrl: string;
}

type Game = {
  id: string;
  date: string;
  teams: Team[];
  phase: {
    title: string;
  };
}

interface Data {
  games: Game[];
}

const games = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'GET') {
    await graphql.request(`
      query GetAllGames {
        games(stage: PUBLISHED, orderBy: date_ASC, first: 50) {
          id
          date
          teams {
            title
            flagUrl
          }
          phase {
            title
          }
        }
      }
    `).then(data => {
      res.status(200).json(data);
    });
  }
}

export default games;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string
}

type BodyPostProps = {
  email: string;
  gameId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

const guesses = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) => {
  const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

  if (req.method === 'POST') {
    const { body }: { body: BodyPostProps} = req;

    await graphql.request(`
      query GetAllGuessesByGame($id: ID!, $email: String!) {
        game(where: {id: $id}) {
          guesses(where: {participant: {email: $email}}) {
            participant {
              email
            }
          }
        }
      }
    `, {
      id: body.gameId,
      email: body.email
    }).then(async (data) => {
      if (data.game.guesses[0]?.participant.email === body.email) {
        return res.status(400).json({ error: 'You already guessed this game' })
      } else {
        await graphql.request(`
          mutation CreateGuess($firstTeamPoints: Int!, $secondTeamPoints:Int!, $gameId: ID!, $email:String!) {
            createGuess(
              data: {firstTeamPoints: $firstTeamPoints, secondTeamPoints: $secondTeamPoints, game: {connect: {id: $gameId}}, participant: {connect: {email: $email}}}
            ) {
              id
              game {
                id
              }
            }
          }
        `, {
          firstTeamPoints: body.firstTeamPoints,
          secondTeamPoints: body.secondTeamPoints,
          gameId: body.gameId,
          email: body.email
        }).then(async (data) => {
          await graphql.request(`
            mutation PublishGuess($id: ID!) {
              publishGuess(where: {id: $id}) {
                id
              }
            }
          `, {
            id: data.createGuess.id
          });

          await graphql.request(`
            mutation PublishGame($id: ID!) {
              publishGame(where: {id: $id}) {
                id
              }
            }
          `, {
            id: data.createGuess.game.id
          });

          return res.status(201).json({
            id: data.createGuess.id
          });
        });
      }
    })
  }
}

export default guesses;

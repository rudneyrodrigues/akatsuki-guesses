import NextAuth from 'next-auth';
import { GraphQLClient } from 'graphql-request';
import GoogleProvider from 'next-auth/providers/google';

type CreateParticipantResponse = {
  createParticipant: {
    id: string;
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const { name, email } = user;

      const graphql = new GraphQLClient(String(process.env.HYGRAPH_CONTENT_API));

      const userAlreadyExists = await graphql.request(`
        query GetParticipantByEmail($email:String!) {
          participant(where: {email: $email}) {
            id
          }
        }
      `, {
        email
      })

      if (userAlreadyExists.participant !== null) {
        return true;
      }

      await graphql.request(`
        mutation CreateParticipant($name: String!, $email:String!) {
          createParticipant(
            data: {name: $name, email: $email}
          ) {
            id
          }
        }
      `, {
        name,
        email
      }).then(async (res: CreateParticipantResponse) => {
        await graphql.request(`
          mutation PublishParticipant($id: ID!) {
            publishParticipant(where: {id: $id}) {
              id
            }
          }
        `, {
          id: res.createParticipant.id
        })
      }).catch(err => {
        console.log(err)
      })

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

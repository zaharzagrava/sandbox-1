import { DocumentNode, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ClientDTO, GetClientMyselfArgs } from '../types';

// --- Setting up Apollo Client
export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4001/graphql' : 'production url',
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    },
    mutate: {
      fetchPolicy: 'no-cache'
    }
  }
});

export default {
  getSession: async () => {},
  postSession: () => {},
  deleteSession: () => {},
  getTables: () => {},
  getClientMyself: (getClientMyselfArgs: GetClientMyselfArgs) =>
    client.query<{ getClient: ClientDTO[] }, GetClientMyselfArgs>({
      query: gql`
        query GetClientMyself($id: String!) {
          getClient(id: $id) {
            full_name
            username
            website
            bio
            email
          }
        }
      `,
      variables: getClientMyselfArgs
    }),
  getClientOther: () => {},
  getClientsFollowers: () => {},
  getClientsCloseFriends: () => {},
  getClientsInterestingPeople: () => {},
  getClientsLikers: () => {},
  postClient: () => {},
  putClient: () => {},
  deleteClient: () => {},
  getPostsMainFeed: () => {},
  getPostsBookmarked: () => {},
  postPost: () => {}
};

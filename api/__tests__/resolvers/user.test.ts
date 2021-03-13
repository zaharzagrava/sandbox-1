import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
// import supoertest from "supertest";

const apolloClient = new ApolloBoost({
  uri: 'http://localhost:4001/graphql',
});

describe('FlatListSpinner', () => {
  it('should render', async () => {
    const createUser = gql`
      query {
        getUser(id: "a") {
          email
        }
      }
    `;

    const response = await apolloClient.query({
      query: createUser,
    });

    console.log(response);
  });
});

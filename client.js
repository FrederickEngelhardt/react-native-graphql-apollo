import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import gql from "graphql-tag";

const typeDefs = gql`
    extend type Query {
				email: String!
    }

    extend type Mutation {
				updateEmail(email: String!): Void
				createEmail(email: String!, password: String!): Void
    }
`;

export const GET_EMAIL = gql`
    query GetEmail {
        email @client
    }
`;

export const UPDATE_EMAIL = gql`
    mutation UpdateEmail($email: String!) {
				updateEmail(email: $email) @client {
						email
				}
    }
`

export const CREATE_ACCOUNT = gql`
		mutation CreateAccount($email: String!, $password: String!) {
				createAccount(email: $email, password: $password) @client {
						email
						password
				}
		}
`

const cache = new InMemoryCache();
cache.writeData({
	data: {
		email: 'blah@gmail.com',
		password: 'test',
	},
});

// Pretend we've got a GraphQL server running locally...
const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
	cache,
	link: httpLink,
	resolvers: {
		Mutation: {
			createAccount: (__root, { email, password }, { cache }) => {
				cache.writeData({ data: { email, password } });
				return { __typename: 'createAccount', email, password }
			},
			updateEmail: (__root, { email }, { cache }) => {
				cache.writeData({ data: { email } });
				return { __typename: 'updateEmail', email }
			},
		}
	},
	typeDefs,
});

export default client;

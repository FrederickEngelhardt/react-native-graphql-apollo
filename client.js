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
    }
`;

export const GET_CART_ITEMS = gql`
    query GetCartItems {
        cartItems @client
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

const cache = new InMemoryCache();
cache.writeData({
	data: {
		cartItems: ['dumbo', 'not dumbo'],
		email: 'blah@gmail.com'
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
			updateEmail: (__root, { email }, { cache }) => {
				// const data = { email };
				console.log(email)
				cache.writeData({ data: { email } });
				return { __typename: 'updateEmail', email }
			},
		}
	},
	typeDefs,
});

export default client;

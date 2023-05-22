import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://autobiznes.local/graphql',
  cache: new InMemoryCache(),
})

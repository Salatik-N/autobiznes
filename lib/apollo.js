import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useEffect } from 'react'

const httpLink = createHttpLink({
  uri: 'http://react.autobiznes.by/graphql',
})

const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    return {
      headers: {
        ...headers,
        authorization: token && `Bearer ${token}`,
      },
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

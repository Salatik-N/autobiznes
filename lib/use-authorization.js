import React, { useState, useContext, createContext, useEffect } from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import { initializeApollo } from './apollo'
import { useRouter } from 'next/router'
import { LOGIN_USER } from './api'

const apolloClient = initializeApollo()
const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>{children}</ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

export function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken')
    if (storedAuthToken) {
      setAuthToken(storedAuthToken)
    } else {
      setAuthToken(null)
    }
  }, [authToken])

  const isSignedIn = () => {
    return authToken !== null
  }

  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      headers: getAuthHeaders(),
    })

    const updatedClient = new ApolloClient({
      cache: new InMemoryCache(),
      link,
    })

    return updatedClient
  }

  const signIn = async ({ email, password }) => {
    let username = email

    const result = await apolloClient
      .mutate({
        mutation: LOGIN_USER,
        variables: { username, password },
      })
      .catch((err) => console.log(err))

    if (result?.data?.login?.authToken) {
      const token = result.data.login.authToken
      localStorage.setItem('authToken', token)
      setAuthToken(token)
      router.push('/account')
    }
  }

  const signOut = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
  }

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  }
}

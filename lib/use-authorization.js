import React, { useState, useMemo, useContext, createContext, useEffect } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client'
import { initializeApollo } from './apollo'
import { useRouter } from 'next/router'
import { LOGIN_USER } from './api'
import Cookies from 'js-cookie'

const apolloClient = initializeApollo()
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedAuthToken = Cookies.get('authToken')
    if (storedAuthToken) {
      setAuthToken(storedAuthToken)
    } else {
      setAuthToken(null)
    }
  }, [authToken])

  const isSignedIn = useMemo(() => {
    return authToken !== null
  }, [authToken])

  const isRouteForbidden = !isSignedIn && router.pathname.includes('/account')

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
      .catch((err) => console.error(err))

    if (result?.data?.login?.authToken) {
      const token = result.data.login.authToken
      await Cookies.set('authToken', token)
      setAuthToken(token)
      router.push('/account')
    }
  }

  const signOut = () => {
    router.push('/')
    Cookies.remove('authToken')
    setAuthToken(null)
  }

  return {
    setAuthToken,
    isSignedIn,
    isRouteForbidden,
    signIn,
    signOut,
    createApolloClient,
  }
}

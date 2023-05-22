import { gql } from '@apollo/client'
import { client } from '../lib/apollo'
import { useState } from 'react'

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      success
      token
      user {
        username
      }
    }
  }
`

export function useAuthorization(phone, email, password) {
  let username
  if (email === '' && phone !== '') {
    username = phone.replace(/\D/g, '')
  } else {
    username = email
  }

  client
    .mutate({
      mutation: LOGIN_USER,
      variables: {
        username,
        password,
      },
    })
    .then((result) => {
      console.log('User login:', result.data.login)
    })
    .catch((error) => {
      // Обработка ошибки
      console.log(error)
    })
}

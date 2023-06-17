import { gql } from '@apollo/client'
import { client } from '../lib/apollo'

export const useRegistration = ({ firstName, email, password }) => {
  const username = email
  // Определяем GraphQL-мутацию для регистрации пользователя
  const REGISTER_USER = gql`
    mutation RegisterUser($firstName: String!, $username: String!, $email: String, $password: String!) {
      registerUser(input: { firstName: $firstName, username: $username, email: $email, password: $password }) {
        user {
          firstName
          username
          email
        }
      }
    }
  `

  // Выполняем мутацию для регистрации пользователя
  client
    .mutate({
      mutation: REGISTER_USER,
      variables: {
        firstName,
        username,
        email,
        password,
      },
    })
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })
}

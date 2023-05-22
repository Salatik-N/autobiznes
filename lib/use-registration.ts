import { gql } from '@apollo/client'
import { client } from '../lib/apollo'

export const useRegistration = ({ firstName, phone, email, password }) => {
  let username
  if (email === '' && phone !== '') {
    username = phone.replace(/\D/g, '')
    email = `${username}@autocompletemail.change`
  } else {
    username = email
  }
  // Определяем GraphQL-мутацию для регистрации пользователя
  const REGISTER_USER = gql`
    mutation RegisterUser($firstName: String!, $username: String!, $phone: String, $email: String, $password: String!) {
      registerUser(
        input: { firstName: $firstName, username: $username, lastName: $phone, email: $email, password: $password }
      ) {
        user {
          firstName
          username
          email
          lastName
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
        phone,
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

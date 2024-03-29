import { useState } from 'react'
import { useAuth } from '../lib/use-authorization'
import { initializeApollo } from '../lib/apollo'
import { REGISTER_USER } from '../lib/api'

enum FIELDS {
  FIRST_NAME = 'firstName',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export default function SignUpForm() {
  const apolloClient = initializeApollo()
  const { signIn } = useAuth()
  const [form, setForm] = useState({
    [FIELDS.FIRST_NAME]: '',
    [FIELDS.EMAIL]: '',
    [FIELDS.PASSWORD]: '',
  })

  const handleChangeForm = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    const name = target?.name
    const value = target?.value

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const createNewUser = async (e) => {
    e.preventDefault()
    apolloClient
      .mutate({
        mutation: REGISTER_USER,
        variables: {
          firstName: form[FIELDS.FIRST_NAME],
          username: form[FIELDS.EMAIL],
          email: form[FIELDS.EMAIL],
          password: form[FIELDS.PASSWORD],
        },
      })
      .then((result) => {
        console.log(result)
        let email = form[FIELDS.EMAIL]
        let password = form[FIELDS.PASSWORD]
        signIn({ email, password })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={createNewUser} autoComplete="on">
      <div>
        <label>
          <span>Электронная почта</span>
          <input
            name={FIELDS.EMAIL}
            type="email"
            placeholder="Введите вашу почту"
            value={form[FIELDS.EMAIL]}
            onChange={handleChangeForm}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Ваше имя</span>
          <input
            name={FIELDS.FIRST_NAME}
            type="text"
            placeholder="Введите ваше имя"
            value={form[FIELDS.FIRST_NAME]}
            onChange={handleChangeForm}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Пароль</span>
          <input
            name={FIELDS.PASSWORD}
            type="password"
            placeholder="Пароль минимум из 8 символов"
            value={form[FIELDS.PASSWORD]}
            onChange={handleChangeForm}
          />
        </label>
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

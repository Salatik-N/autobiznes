import { useState } from 'react'
import { useRegistration } from '../lib/use-registration'
import { initializeApollo } from '../lib/apollo'
import { REGISTER_USER } from '../lib/api'

enum FIELDS {
  FIRST_NAME = 'firstName',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export default function SignUpForm() {
  const apolloClient = initializeApollo()
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
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={createNewUser} autoComplete="on">
      <div>
        <label>Электронная почта</label>
        <input
          name="email"
          type="email"
          placeholder="Введите вашу почту"
          value={form[FIELDS.EMAIL]}
          onChange={handleChangeForm}
        />
      </div>
      <div>
        <label>Ваше имя</label>
        <input
          name="name"
          type="text"
          placeholder="Введите ваше имя"
          value={form[FIELDS.FIRST_NAME]}
          onChange={handleChangeForm}
        />
      </div>
      <div>
        <label>Пароль</label>
        <input
          name="password"
          type="password"
          placeholder="Пароль минимум из 8 символов"
          value={form[FIELDS.PASSWORD]}
          onChange={handleChangeForm}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

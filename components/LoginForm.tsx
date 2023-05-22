import { useState } from 'react'
import { useAuthorization } from '../lib/use-authorization'

export default function LoginForm({ emailSignupMethod }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    useAuthorization(phone, email, password)
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
      {emailSignupMethod ? (
        <div>
          <label>Электронная почта</label>
          <input
            type="email"
            name="email"
            placeholder="Введите вашу почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <label>Ваш телефон</label>
          <input
            type="text"
            name="phone"
            placeholder="+375(__)___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      )}
      <div>
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          placeholder="Ваш пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Забыли пароль?</button>
      <button type="submit">Войти</button>
    </form>
  )
}

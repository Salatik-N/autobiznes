import { useState } from 'react'
import { useAuth } from '../lib/use-authorization'
import { initializeApollo } from '../lib/apollo'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="on">
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

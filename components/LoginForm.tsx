import { useState } from 'react'
import { useAuth } from '../lib/use-authorization'
import { initializeApollo } from '../lib/apollo'
import Link from 'next/link'

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
        <label>
          <span>Электронная почта</span>
          <input
            type="email"
            name="email"
            placeholder="Введите вашу почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Пароль</span>
          <input
            type="password"
            name="password"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button className="reset-password-button">Забыли пароль?</button>
      <button type="submit">Войти</button>
      <div className="footer-login-form">
        <span>Для тех, кто первый раз на сайте</span>
        <Link href={'/signup'}>Зарегистрироваться</Link>
      </div>
    </form>
  )
}

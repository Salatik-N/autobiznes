import { useState } from 'react'
import { useRegistration } from '../lib/use-registration'

export default function SignUpForm() {
  const [firstName, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      useRegistration({ firstName, email, password })
      // setName('')
      // setEmail('')
      // setPassword('')
    } catch (error) {
      console.error('Registration error:', error)
    }
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
        <label>Ваше имя</label>
        <input type="text" name="name" value={firstName} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          placeholder="Пароль минимум из 8 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

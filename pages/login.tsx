import LoginForm from '../components/LoginForm'
import Container from '../components/Container'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="login-page">
      <Container>
        <div className="white-background page-form">
          <div className="popup-title">Вход в кабинет</div>
          <LoginForm />
          <div className="footer-login-form">
            <span>Для тех, кто первый раз на сайте</span>
            <Link href={'/signup'}>Зарегистрироваться</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

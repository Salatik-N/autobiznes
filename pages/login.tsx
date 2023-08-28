import LoginForm from '../components/LoginForm'
import Container from '../components/Container'

export default function LoginPage() {
  return (
    <div className="login-page">
      <Container>
        <div className="white-background page-form">
          <div className="popup-title">Вход в кабинет</div>
          <LoginForm />
        </div>
      </Container>
    </div>
  )
}

import Container from '../components/Container'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <div className="signup-page">
      <Container>
        <div className="white-background page-form">
          <div className="popup-title">Регистрация</div>
          <SignUpForm />
        </div>
      </Container>
    </div>
  )
}

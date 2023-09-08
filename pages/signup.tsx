import Container from '../components/Container'
import SignUpForm from '../components/SignUpForm'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="signup-page">
      <Container>
        <div className="white-background page-form">
          <div className="popup-title">Регистрация</div>
          <SignUpForm />
          <div className="footer-signup-form">
            <span>Если у вас есть аккаунт, войдите через него</span>
            <Link href={'/login'}>Войти</Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

import React, { useState } from 'react'
import Modal from './Modal'
import SingUpForm from './SignUpForm'
import Link from 'next/link'

const SignUp = ({ children, style }) => {
  const [modalActive, setModalActive] = useState(false)

  const handleModalOpen = () => {
    setModalActive(true)
  }

  return (
    <>
      <button className={style} onClick={handleModalOpen}>
        {children}
      </button>

      <Modal active={modalActive} setModalActive={setModalActive}>
        <div className="popup-title">Регистрация</div>
        <SingUpForm />
        <div className="footer-signup-form">
          <span>Если у вас есть аккаунт, войдите через него</span>
          <Link href={'/login'} onClick={() => setModalActive(false)}>
            Войти
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default SignUp

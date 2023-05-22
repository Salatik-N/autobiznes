import React, { useState } from 'react'
import Modal from './Modal'
import SingUpForm from './SignUpForm'

const SignUp = ({ children, style }) => {
  const [modalActive, setModalActive] = useState(false)
  const [emailSignupMethod, setEmailSignupMethod] = useState(false)

  const handleModalOpen = () => {
    setModalActive(true)
  }

  return (
    <>
      <button className={style} onClick={handleModalOpen}>
        {children}
      </button>

      <Modal active={modalActive} setModalActive={setModalActive}>
        <div>Регистрация</div>
        <div>
          <button
            className={`${emailSignupMethod === false ? 'active' : ''}`}
            onClick={() => setEmailSignupMethod(false)}
          >
            По телефону
          </button>
          <button
            className={`${emailSignupMethod === true ? 'active' : ''}`}
            onClick={() => setEmailSignupMethod(true)}
          >
            По почте
          </button>
        </div>
        <SingUpForm emailSignupMethod={emailSignupMethod} />
        <p>Если у вас есть аккаунт, войдите через него.</p>
        <button>Войти</button>
      </Modal>
    </>
  )
}

export default SignUp

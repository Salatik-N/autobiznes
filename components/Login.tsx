import React, { useState } from 'react'
import Modal from './Modal'
import LoginFrom from './LoginForm'

const Login = ({ children, style }) => {
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
        <div>Вход в кабинет</div>
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
        <LoginFrom emailSignupMethod={emailSignupMethod} />
      </Modal>
    </>
  )
}

export default Login

import React, { useState } from 'react'
import Modal from './Modal'
import SingUpForm from './SignUpForm'

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
        <div>Регистрация</div>
        <SingUpForm />
        <p>Если у вас есть аккаунт, войдите через него.</p>
        <button>Войти</button>
      </Modal>
    </>
  )
}

export default SignUp

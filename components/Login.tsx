import React, { useState } from 'react'
import Modal from './Modal'

import LoginFrom from './LoginForm'

const Login = ({ children, style }) => {
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
        <div>Вход в кабинет</div>
        <LoginFrom />
      </Modal>
    </>
  )
}

export default Login

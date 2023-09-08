import React, { useState } from 'react'
import Modal from './Modal'
import Link from 'next/link'

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
        <div className="popup-title">Вход в кабинет</div>
        <LoginFrom setModalActive={setModalActive} />
        <div className="footer-login-form">
          <span>Для тех, кто первый раз на сайте</span>
          <Link href={'/signup'} onClick={() => setModalActive(false)}>
            Зарегистрироваться
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default Login

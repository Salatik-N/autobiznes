import Link from 'next/link'
import MediaQuery from 'react-responsive'
import styles from './Header.module.scss'
import Image from 'next/image'
import Login from './Login'
import SignUp from './SignUp'
import { useState } from 'react'
import HeaderNav from './HeaderNav'
import logo from '../public/icons/logo.svg'
import SocialIcons from './SocialIcons'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.holderInner}>
        <div className={styles.siteLogo}>
          <Link href="/">
            <Image src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className={`header-info ${open ? styles.burgerOpen : ''}`}>
          {/*<MediaQuery maxWidth={1023}>
            <div className={styles.burgerBlock} onClick={() => setOpen(!open)}></div>
  </MediaQuery>*/}
          <div className={styles.burgerBlock} onClick={() => setOpen(!open)}></div>
          <MediaQuery minWidth={1024}>
            <HeaderNav />
          </MediaQuery>
        </div>
      </div>
      {open ? (
        <div className={styles.burgerMenu}>
          <HeaderNav />
          <div className={styles.burgerInfo}>
            <div className={styles.buttons}>
              <SignUp style={styles.registration}>Регистрация</SignUp>
              <Login style={styles.logIn}>Войти</Login>
            </div>
            <SocialIcons />
            <div className={styles.copyright}>
              При копировании материалов установка ссылки на официальный сайт обязательна.
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

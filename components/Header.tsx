import Link from 'next/link'
import styles from './Header.module.scss'
import Image from 'next/image'
import Login from './Login'
import SignUp from './SignUp'
import { useState } from 'react'
import HeaderNav from './HeaderNav'
import logo from '../public/icons/logo.svg'
import SocialIcons from './SocialIcons'
import userIcon from '../public/icons/user.svg'
import { useAuth } from '../lib/use-authorization'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GET_USER_INFO } from '../lib/api'
import { useQuery } from '@apollo/client'

export default function Header() {
  const { data, fetchMore } = useQuery(GET_USER_INFO)
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleRouteChange = () => {
    setOpen(false)
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}></div>
      <div className={styles.holderInner}>
        <div className={styles.siteLogo}>
          <Link href="/">
            <Image src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className={styles.controlButtons}>
          {isSignedIn && (
            <div className={styles.user}>
              <span>{data?.viewer?.username}</span>
              <Link href="/account" className={styles.userIcon}>
                <Image src={userIcon} alt="Пользователь" />
              </Link>
            </div>
          )}
          <div className={`${styles.headerInfo} ${open ? styles.burgerOpen : ''}`}>
            <div className={styles.headerBlock}>
              <HeaderNav />
              {!isSignedIn && (
                <div className={styles.buttons}>
                  <SignUp style={styles.registration}>Регистрация</SignUp>
                  <Login style={styles.logIn}>Войти</Login>
                </div>
              )}
            </div>
            <div className={styles.burgerBlock} onClick={() => setOpen(!open)}></div>
          </div>
        </div>
      </div>
      {open ? (
        <div className={styles.burgerMenu}>
          <HeaderNav />
          <div className={styles.burgerInfo}>
            {!isSignedIn && (
              <div className={styles.buttons}>
                <SignUp style={styles.registration}>Регистрация</SignUp>
                <Login style={styles.logIn}>Войти</Login>
              </div>
            )}
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

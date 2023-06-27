import styles from './ModalUserMenu.module.scss'
import { useRouter } from 'next/router'
import boxesIcon from '../public/icons/boxes.svg'
import Link from 'next/link'
import Image from 'next/image'

export default function ModalUserMenu() {
  const router = useRouter()

  const logoutUser = () => {
    localStorage.removeItem('authToken')
  }

  return (
    <>
      <span className={styles.title}>Меню кабинета</span>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Меню заказчика</span>
        </div>
        <Link href="/account/add-cargo" className={styles.button}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Добавить заказ/груз
        </Link>
        <Link href="/account/cargos" className={styles.button}>
          <Image src={boxesIcon} alt="Груз" />
          Мои заказы/грузы
        </Link>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Меню исполнителя</span>
        </div>
        <Link href="/account/add-transport" className={styles.button}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Добавить технику
        </Link>
        <Link href="/account/transports" className={styles.button}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Моя техника
        </Link>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Управление техникой</span>
        </div>
        <Link href="/transports" className={styles.button}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Поиск транспорта
        </Link>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Управление заказами</span>
        </div>
        <Link href="/cargos" className={styles.button}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Поиск грузов
        </Link>
      </div>
      <div className={styles.menuFooter}>
        <Link
          href="/account/setting"
          className={`${styles.button} ${router.pathname === '/account/setting' && styles.active}`}
        >
          <Image src={boxesIcon} alt="Добавить груз" />
          Настройки
        </Link>
        <Link
          href="/account/support"
          className={`${styles.button} ${router.pathname === '/account/support' && styles.active}`}
        >
          <Image src={boxesIcon} alt="Добавить груз" />
          Техподдержка
        </Link>
        <button className={styles.button} onClick={logoutUser}>
          <Image src={boxesIcon} alt="Добавить груз" />
          Выйти
        </button>
      </div>
    </>
  )
}

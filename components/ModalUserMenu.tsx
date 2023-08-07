import styles from './ModalUserMenu.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import addCargoIcon from '../public/icons/add-cargo.svg'
import boxesIcon from '../public/icons/boxes.svg'
import addTransportIcon from '../public/icons/add-transport.svg'
import truckIcon from '../public/icons/truck.svg'
import logisticIcon from '../public/icons/logistics.svg'
import searchCargoIcon from '../public/icons/search-cargo.svg'
import SettingSVG from './SettingSVG'
import SupportSVG from './SupportSVG'
import signOutIcon from '../public/icons/power-button.svg'

export default function ModalUserMenu() {
  const router = useRouter()

  const logoutUser = () => {
    localStorage.removeItem('authToken')
    router.push('/')
  }

  return (
    <>
      <span className={styles.title}>Меню кабинета</span>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Меню заказчика</span>
        </div>
        <Link href="/account/add-cargo" className={styles.button}>
          <Image src={addCargoIcon} alt="Добавить груз" />
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
          <Image src={addTransportIcon} alt="Добавить груз" />
          Добавить технику
        </Link>
        <Link href="/account/transports" className={styles.button}>
          <Image src={truckIcon} alt="Добавить груз" />
          Моя техника
        </Link>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Управление техникой</span>
        </div>
        <Link href="/transports" className={styles.button}>
          <Image src={logisticIcon} alt="Добавить груз" />
          Поиск транспорта
        </Link>
      </div>
      <div className={styles.menuItem}>
        <div className={styles.label}>
          <span>Управление заказами</span>
        </div>
        <Link href="/cargos" className={styles.button}>
          <Image src={searchCargoIcon} alt="Добавить груз" />
          Поиск грузов
        </Link>
      </div>
      <div className={styles.menuFooter}>
        <Link
          href="/account/setting"
          className={`${styles.button} ${router.pathname === '/account/setting' && styles.active}`}
        >
          <SettingSVG fill={`${router.pathname === '/account/setting' ? 'white' : 'black'}`} />
          Настройки
        </Link>
        <Link
          href="/account/support"
          className={`${styles.button} ${router.pathname === '/account/support' && styles.active}`}
        >
          <SupportSVG fill={`${router.pathname === '/account/support' ? 'white' : 'black'}`} />
          Техподдержка
        </Link>
        <button className={styles.button} onClick={logoutUser}>
          <Image src={signOutIcon} alt="Добавить груз" />
          Выйти
        </button>
      </div>
    </>
  )
}

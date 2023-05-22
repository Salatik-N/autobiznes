import Image from 'next/image'
import styles from './CargoFilter.module.scss'
import searchIcon from '../public/icons/search.svg'

export default function CargoFilter() {
  return (
    <div className={`${styles.filterBlock} white-background`}>
      <button className={styles.filterButton}>
        <Image src={searchIcon} alt="Поиск" />
      </button>
    </div>
  )
}

import Link from 'next/link'
import styles from './Header.module.scss'

export default function HeaderNav() {
  const navigation = [
    { id: 1, title: 'Главная', path: '/' },
    { id: 2, title: 'Грузы', path: '/cargos' },
    { id: 3, title: 'Транспорт', path: '/transports' },
  ]
  return (
    <>
      <nav>
        <ul className={styles.headerMenu}>
          {navigation.map((item) => (
            <li key={item.id}>
              <Link href={`${item.path}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

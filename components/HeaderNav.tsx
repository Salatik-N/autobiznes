import Link from 'next/link'

export default function HeaderNav() {
  const navigation = [
    { id: 1, title: 'Главная', path: '/' },
    { id: 2, title: 'Грузы', path: '/cargos' },
    { id: 3, title: 'Транспорт', path: '/transport' },
  ]
  return (
    <>
      <nav>
        <ul className="header-menu">
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

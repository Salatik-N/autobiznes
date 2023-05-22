import Link from 'next/link'

export default function FooterNav() {
  const navigation = [
    { id: 1, title: 'Главная', path: '/' },
    { id: 2, title: 'Грузы', path: '/cargos' },
    { id: 3, title: 'Транспорт', path: '/transport' },
  ]
  return (
    <>
      <ul>
        {navigation.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

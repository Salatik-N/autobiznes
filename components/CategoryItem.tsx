import Image from 'next/image'
import Link from 'next/link'
import styles from './CategoryItem.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'

interface CategoryItemProps {
  category: {
    name: string
    children: {
      edges: {
        node: {
          slug: string
          name: string
        }
      }[]
    }
  }
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  function customSort(a, b) {
    function extractNumber(str) {
      const matches = str.match(/(\d+(?:,\d+)?)/)
      if (matches) {
        return parseFloat(matches[1].replace(',', '.'))
      }
      return Infinity // Возвращаем бесконечность для строк без чисел
    }

    const numA = extractNumber(a.props.item.name)
    const numB = extractNumber(b.props.item.name)

    if (numA < numB) return -1
    if (numA > numB) return 1

    return a.props.item.name.localeCompare(b) // Если числа равны, сортируем по алфавиту
  }
  return (
    <div className={styles.categories}>
      <div className={styles.title}>{category.name}</div>
      <div className={styles.categoryList}>
        {category.children.edges
          .map((item) => <HoverableItem key={item.node.slug} item={item.node} />)
          .sort(customSort)}
      </div>
    </div>
  )
}

interface HoverableItemProps {
  item: {
    slug: string
    name: string
  }
}

const HoverableItem: React.FC<HoverableItemProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false)
  const isAccountPage = useRouter().pathname.includes('/account')

  const link = isAccountPage ? `/account/add-transport/${item.slug}/` : `/transports/${item.slug}/`

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link
      href={link}
      className={`${styles.item} ${isHovered ? `${styles.hover}` : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={`/images/${item.slug}.png`} className={styles.mainImage} alt={item.name} width={172} height={125} />
      <Image
        src={`/images/${item.slug}-turn.png`}
        className={styles.turnImage}
        alt={item.name}
        width={172}
        height={125}
      />
      <span>{item.name}</span>
    </Link>
  )
}

export default CategoryItem

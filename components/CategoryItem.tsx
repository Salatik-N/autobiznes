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
  return (
    <div className={styles.categories}>
      <div className={styles.title}>{category.name}</div>
      <div className={styles.categoryList}>
        {category.children.edges.map((item) => (
          <HoverableItem key={item.node.slug} item={item.node} />
        ))}
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
    <Link href={link} className={styles.item} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered ? (
        <Image src={`/static/images/${item.slug}-turn.png`} alt={item.name} width={172} height={125} />
      ) : (
        <Image src={`/static/images/${item.slug}.png`} alt={item.name} width={172} height={125} />
      )}
      <span>{item.name}</span>
    </Link>
  )
}

export default CategoryItem

import Image from 'next/image'
import styles from './CategoryItem.module.scss'
import { useState } from 'react'

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

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <a
      href={`transport/${item.slug}/`}
      className={styles.item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <Image src={`/images/${item.slug}-turn.png`} alt={item.name} width={172} height={125} />
      ) : (
        <Image src={`/images/${item.slug}.png`} alt={item.name} width={172} height={125} />
      )}
      <span>{item.name}</span>
    </a>
  )
}

export default CategoryItem

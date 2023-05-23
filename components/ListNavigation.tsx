import styles from './ListNavigation.module.scss'

const ListNavigation = () => {
  return (
    <div className={styles.inner}>
      <div className={styles.numbers}>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
      <div className={styles.next}>
        <button>
          Дальше <i className={styles.arrow} />
        </button>
      </div>
    </div>
  )
}
export default ListNavigation

import styles from './AdminTools.module.scss'
import { initializeApollo } from '../lib/apollo'
import { DELETE_TRANSPORT } from '../lib/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import viewsIcon from '../public/icons/views.svg'
import DeleteSVG from './DeleteSVG'
import editIcon from '../public/icons/edit.svg'

type itemProps = {
  databaseId: number
  acfTransportDescription: {
    views: number
  }
  acfCargoDescription: {
    views: number
  }
}
type adminToolsProps = {
  item: itemProps
  type: String
}

const AdminTools: React.FC<adminToolsProps> = ({ item, type }) => {
  const router = useRouter()
  const apolloClient = initializeApollo()
  const handleDelete = (id) => {
    apolloClient.mutate({
      mutation: DELETE_TRANSPORT,
      variables: { id: id },
    })
  }
  const handleEdit = async (id) => {
    router.push({
      pathname: `/account/edit-${type}`,
      query: { id: id },
    })
  }

  return (
    <div className={`${styles.adminTools} ${type === 'cargo' && styles.cargoTools}`}>
      <div className={styles.views}>
        <Image src={viewsIcon} width={20} height={20} alt="Просмотров" />
        {item.acfTransportDescription?.views === null || item.acfCargoDescription?.views === null
          ? '0'
          : item.acfTransportDescription?.views || item.acfCargoDescription?.views}
      </div>
      <button className={styles.delete} onClick={() => handleDelete(item.databaseId)}>
        <DeleteSVG fill={'#9A9EA7'} />
      </button>
      <button className={styles.edit} onClick={() => handleEdit(item.databaseId)}>
        <Image src={editIcon} width={25} height={25} alt="Редактировать" />
      </button>
    </div>
  )
}
export default AdminTools

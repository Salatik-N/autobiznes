import styles from './ImagesGallery.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import transportDefaultIcon from '../public/icons/transport-default.svg'

type imagesGalleryProps = {
  photos: any
  isActiveAdminTools?: Boolean
}

const ImagesGallery: React.FC<imagesGalleryProps> = ({ photos, isActiveAdminTools }) => {
  const [activeImageID, setActiveImageID] = useState(0)

  const handleSlideClick = (index) => {
    if (index < 0 || index > photos.length - 1) return
    setActiveImageID(index)
  }

  return (
    <div className={`images-list ${styles.images} ${isActiveAdminTools ? styles.accountPage : ''}`}>
      {!photos && (
        <div className={styles.defaultImage}>
          <Image src={transportDefaultIcon} width={79} height={47} alt="Нет изображения" />
        </div>
      )}
      {photos &&
        photos.map((image, index) => (
          <div key={index} className={`images-item ${styles.image} ${index === activeImageID ? styles.activeImage : null}`}>
            <Image src={image.mediaItemUrl} width={330} height={166} alt="Изображение автомобиля" />
          </div>
        ))}
      {photos && photos.length > 1 && (
        <>
          <div className={styles.buttons}>
            {activeImageID > 0 && (
              <div className={styles.leftButton}>
                <button onClick={() => handleSlideClick(activeImageID - 1)}>
                  <i />
                </button>
              </div>
            )}
            {activeImageID < photos.length - 1 && (
              <div className={styles.rightButton}>
                <button onClick={() => handleSlideClick(activeImageID + 1)}>
                  <i />
                </button>
              </div>
            )}
          </div>
          <div className={styles.controls}>
            {photos.map((_, index) => (
              <div
                key={index}
                className={`${styles.item} ${activeImageID === index ? styles.active : ''}`}
                onClick={() => handleSlideClick(index)}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImagesGallery

import Modal from './Modal'
import Image from 'next/image'
import AccountMenu from './AccountMenu'
import MenuIcon from '../public/icons/account-menu.svg'

export default function AccountHeader({ modalActive, setModalActive }) {
  return (
    <>
      <span className="account-title">Личный кабинет</span>
      <button className="menu-account" onClick={() => setModalActive(true)}>
        <Image src={MenuIcon} width={27} height={27} alt="Меню" />
        Меню кабинета
      </button>
      <Modal active={modalActive} setModalActive={setModalActive}>
        <AccountMenu />
      </Modal>
    </>
  )
}

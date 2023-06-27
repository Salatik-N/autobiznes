import Modal from './Modal'
import ModalUserMenu from './ModalUserMenu'

export default function AccountHeader({ modalActive, setModalActive }) {
  return (
    <>
      <span className="account-title">Личный кабинет</span>
      <button className="menu-account" onClick={() => setModalActive(true)}>
        Меню кабинета
      </button>
      <Modal active={modalActive} setModalActive={setModalActive}>
        <ModalUserMenu />
      </Modal>
    </>
  )
}

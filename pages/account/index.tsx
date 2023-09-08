import { useState } from 'react'
import Container from '../../components/Container'
import AccountHeader from '../../components/AccountHeader'
import AccountLinks from '../../components/AccountLinks'
import AccountMenu from '../../components/AccountMenu'

export default function Account() {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div className="account-page">
      <Container>
        <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
        <div className="wrapper">
          <div className="menu-big">
            <AccountMenu />
          </div>
          <div className="content">
            <div className="white-background account-text-block">
              <AccountLinks />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

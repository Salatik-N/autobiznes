import { useState } from 'react'
import Container from '../../components/Container'
import AccountHeader from '../../components/AccountHeader'
import AccountLinks from '../../components/AccountLinks'
import { useAuth } from '../../lib/use-authorization'

export default function Account() {
  const [modalActive, setModalActive] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    isSignedIn && (
      <Container>
        <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
        <div className="white-background account-text-block">
          <AccountLinks />
        </div>
      </Container>
    )
  )
}

import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import AccountHeader from '../../components/AccountHeader'
import AccountLinks from '../../components/AccountLinks'
import { initializeApollo } from '../../lib/apollo'
import { GET_USER_INFO, SEND_SUPPORT_MAIL } from '../../lib/api'
import { useQuery } from '@apollo/client'
import AccountMenu from '../../components/AccountMenu'

enum FIELDS {
  FROM = 'from',
  TO = 'to',
  BODY = 'body',
  SUBJECT = 'subject',
}

export default function Transports() {
  const { data } = useQuery(GET_USER_INFO)
  const [emailUser, setEmaiUser] = useState('')
  const apolloClient = initializeApollo()
  const [isSent, setIsSent] = useState(false)
  const [modalActive, setModalActive] = useState(false)

  const [form, setForm] = useState({
    [FIELDS.FROM]: 'admin@autobiznes.by',
    [FIELDS.TO]: 'support@autobiznes.by',
    [FIELDS.BODY]: '',
    [FIELDS.SUBJECT]: 'Техподдержка',
  })

  useEffect(() => {
    data?.viewer && setEmaiUser(data.viewer.email || '')
  }, [data])

  const handleChangeForm = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget
    const name = target?.name
    const value = target?.value

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    apolloClient
      .mutate({
        mutation: SEND_SUPPORT_MAIL,
        variables: {
          from: form[FIELDS.FROM],
          to: form[FIELDS.TO],
          subject: form[FIELDS.SUBJECT],
          body: `
          Email: ${emailUser}
          <br>
          Сообщение: ${form[FIELDS.BODY]}
          <br>
          Это письмо отправленно автоматически, отвечайте на email пользователя в письме
          `,
        },
      })
      .then((result) => {
        console.log(result)
        setIsSent(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

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
              <span className="form-block-title">Техподдержка</span>
              {!isSent ? (
                <form onSubmit={handleSubmit} autoComplete="on">
                  <label>
                    <span>Ваше обращение</span>
                    <textarea
                      name={FIELDS.BODY}
                      placeholder="Введите обращение до 300 символов"
                      maxLength={300}
                      value={form[FIELDS.BODY]}
                      onChange={handleChangeForm}
                    />
                  </label>
                  <button type="submit">Отправить</button>
                </form>
              ) : (
                'Мы ответим вам на почту в ближайшее время'
              )}
              <AccountLinks />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

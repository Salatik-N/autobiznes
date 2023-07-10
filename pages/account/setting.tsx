import { useEffect, useState } from 'react'
import { initializeApollo } from '../../lib/apollo'
import { useQuery } from '@apollo/client'
import Container from '../../components/Container'
import { GET_USER_INFO, UPDATE_USER } from '../../lib/api'
import Modal from '../../components/Modal'
import ModalUserMenu from '../../components/ModalUserMenu'
import AccountHeader from '../../components/AccountHeader'

enum FIELDS {
  FIRST_NAME = 'firstName',
  EMAIL = 'email',
  PHONE = 'phone',
}

export default function AccountSetting() {
  const { data } = useQuery(GET_USER_INFO)
  const [modalActive, setModalActive] = useState(false)
  const apolloClient = initializeApollo()
  const [form, setForm] = useState({
    [FIELDS.FIRST_NAME]: '',
    [FIELDS.EMAIL]: '',
    [FIELDS.PHONE]: '',
  })

  useEffect(() => {
    data?.viewer &&
      setForm((prevValue) => ({
        ...prevValue,
        [FIELDS.FIRST_NAME]: data.viewer.firstName || '',
        [FIELDS.EMAIL]: data.viewer.email || '',
        [FIELDS.PHONE]: data.viewer.customField.phone || '',
      }))
  }, [data])

  const handleChangeForm = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.currentTarget
    const name = target?.name
    const value = target?.value

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  const editUserInfo = async (e) => {
    e.preventDefault()
    apolloClient
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          userId: data?.viewer.databaseId,
          firstName: form[FIELDS.FIRST_NAME],
          email: form[FIELDS.EMAIL],
          phone: form[FIELDS.PHONE],
        },
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Container>
        <AccountHeader modalActive={modalActive} setModalActive={setModalActive} />
        <form onSubmit={editUserInfo} autoComplete="on">
          <div className="white-background">
            <span className="form-block-title">Данные для входа в личный кабинет</span>
            <label>
              <span>Ваше имя</span>
              <input
                name={FIELDS.FIRST_NAME}
                type="text"
                placeholder="Введите свое имя"
                value={form[FIELDS.FIRST_NAME]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Электронная почта</span>
              <input
                disabled
                name={FIELDS.EMAIL}
                type="email"
                placeholder="example@mail.ru"
                value={form[FIELDS.EMAIL]}
                onChange={handleChangeForm}
              />
            </label>
            <label>
              <span>Ваш номер телефона</span>
              <input
                name={FIELDS.PHONE}
                type="text"
                placeholder="Введите ваш номер телефона"
                value={form[FIELDS.PHONE]}
                onChange={handleChangeForm}
              />
            </label>
            <button type="submit">Сохранить</button>
          </div>
          {/* <div className="white-background">
              <span className="form-block-title">Изменение пароля</span>
              <label>
                <span>Предыдущий пароль</span>
                <input
                  name={FIELDS.PASSWORD}
                  type="text"
                  placeholder="Введите текст"
                  value={form[FIELDS.PASSWORD]}
                  onChange={handleChangeForm}
                />
              </label>

            <div>
              <label>Новый пароль </label>
              <input
                type="password"
                name="password"
                placeholder="Пароль минимум из 8 символов"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label>Повторите новый пароль</label>
              <input
                type="password"
                name="password"
                placeholder="Пароль минимум из 8 символов"
                value={newPasswordCheck}
                onChange={(e) => setNewPasswordCheck(e.target.value)}
              />
            </div>
            <button type="submit">Сохранить</button>
          </div> */}
        </form>
      </Container>
    </>
  )
}

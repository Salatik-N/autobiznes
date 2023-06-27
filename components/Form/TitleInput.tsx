const TitleInput = ({ name, value, onChange }) => {
  return (
    <div className="white-background">
      <span className="form-block-title">Добавить заголовок</span>
      <label>
        <span>Заголовок</span>
        <input name={name} type="text" placeholder="Введите текст" value={value} onChange={onChange} />
      </label>
    </div>
  )
}
export default TitleInput

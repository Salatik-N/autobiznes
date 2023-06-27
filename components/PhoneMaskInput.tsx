import { useState } from 'react'

export default function PhoneMaskInput({ name, value, onChange }) {
  return <input name={name} type="text" placeholder="+375(__) ___-__-__" value={value} onChange={onChange} />
}

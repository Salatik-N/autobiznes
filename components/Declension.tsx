import React from 'react'

interface Props {
  count: number
  words: [string, string, string]
}

export default function Declension({ count, words }: Props) {
  const getLastDigit = (number: number): number => {
    return number % 10
  }

  const getWordForm = (number: number, words: [string, string, string]): string => {
    const lastDigit = getLastDigit(number)
    const wordIndex =
      lastDigit === 1 && number !== 11 ? 0 : lastDigit >= 2 && lastDigit <= 4 && (number < 10 || number >= 20) ? 1 : 2
    return words[wordIndex]
  }

  const wordForm = getWordForm(count, words)

  return (
    <span>
      {count} {wordForm}
    </span>
  )
}

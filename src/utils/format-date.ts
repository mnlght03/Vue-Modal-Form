/** Возвращает дату в формате DD.MM.YYYY */
export function formatDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

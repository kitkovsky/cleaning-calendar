import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/pl'

dayjs.locale('pl')
dayjs.extend(weekday)
dayjs.extend(weekOfYear)

export const getNextWeekendDates = (): string => {
  const today = dayjs()
  const currentWeekdayIdx = dayjs().weekday()

  const nextSaturday = today.add(5 - currentWeekdayIdx, 'days')
  const nextSunday = today.add(6 - currentWeekdayIdx, 'days')

  return `${nextSaturday.format('DD.MM')} - ${nextSunday.format('DD.MM')}`
}

export const isNowWeekend = (): boolean => [5, 6].includes(dayjs().weekday())

export const getCurrentWeekNumber = (): number => dayjs().week()

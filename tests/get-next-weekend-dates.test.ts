import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getNextWeekendDates } from '../src/utils/weekend.utils.ts'

const CORRECT_WEEKEND_DATES_SAME_MONTH = '07.01 - 08.01'
const WEEK_DAYS_SAME_MONTH = [
  { weekDay: 'mon', date: new Date(2023, 0, 2) },
  { weekDay: 'tue', date: new Date(2023, 0, 3) },
  { weekDay: 'wed', date: new Date(2023, 0, 4) },
  { weekDay: 'thu', date: new Date(2023, 0, 5) },
  { weekDay: 'fri', date: new Date(2023, 0, 6) },
  { weekDay: 'sat', date: new Date(2023, 0, 7) },
  { weekDay: 'sun', date: new Date(2023, 0, 8) },
]

const CORRECT_WEEKEND_DATES_DIFFERENT_MONTHS = '30.09 - 01.10'
const WEEKDAYS_DIFFERENT_MONTHS = [
  { weekDay: 'mon', date: new Date(2023, 8, 25) },
  { weekDay: 'tue', date: new Date(2023, 8, 26) },
  { weekDay: 'wed', date: new Date(2023, 8, 27) },
  { weekDay: 'thu', date: new Date(2023, 8, 28) },
  { weekDay: 'fri', date: new Date(2023, 8, 29) },
  { weekDay: 'sat', date: new Date(2023, 8, 30) },
  { weekDay: 'sun', date: new Date(2023, 9, 1) },
]

const runTests = (
  title: string,
  dates: Array<{ weekDay: string; date: Date }>,
  correctDates: string,
) => {
  describe(title, () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    dates.forEach(({ weekDay, date }) => {
      it(`should get correct weekend dates for a ${weekDay}`, () => {
        vi.setSystemTime(date)

        expect(getNextWeekendDates()).toBe(correctDates)
      })
    })
  })
}

runTests(
  'calculating next weekend dates | same month',
  WEEK_DAYS_SAME_MONTH,
  CORRECT_WEEKEND_DATES_SAME_MONTH,
)
runTests(
  'calculating next weekend dates | different months',
  WEEKDAYS_DIFFERENT_MONTHS,
  CORRECT_WEEKEND_DATES_DIFFERENT_MONTHS,
)

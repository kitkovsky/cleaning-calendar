import { connect, type Config } from '@planetscale/database'
import { getCurrentWeekNumber } from '../utils/weekend.utils.ts'

const PEOPLE = ['tatiana', 'oskar', 'oliwer']

const config = {
  host: import.meta.env['PUBLIC_DB_HOST'] as string,
  username: import.meta.env['PUBLIC_DB_USERNAME'] as string,
  password: import.meta.env['PUBLIC_DB_PASSWORD'] as string,
} satisfies Config

const connection = connect(config)

export const getChoresQuery = async (): Promise<string[]> => {
  const results = await connection.execute(
    'SELECT list FROM cal_chores LIMIT 1',
  )
  return (results.rows[0] as { list: string }).list.split(', ')
}

export const updateChores = async (chores: string): Promise<void> => {
  await connection.execute('UPDATE cal_chores SET list = ? WHERE id = 1', [
    chores,
  ])
}

export const getTodos = async (): Promise<
  Array<{
    chore: string
    name: string
  }>
> => {
  const chores = await getChoresQuery()
  const currentWeekNumber = getCurrentWeekNumber()

  const todos = PEOPLE.map((person, idx) => ({
    name: person,
    chore: chores[(currentWeekNumber + idx) % chores.length] as string,
  }))

  return todos
}

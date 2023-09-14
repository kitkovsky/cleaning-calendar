import { connect, type Config } from '@planetscale/database'
import { getCurrentWeekNumber } from '../utils/weekend.utils.ts'

const PEOPLE = ['tatiana', 'oskar', 'oliwer']

const config = {
  host: process.env['DB_HOST'] as string,
  username: process.env['DB_USERNAME'] as string,
  password: process.env['DB_PASSWORD'] as string,
} satisfies Config

export const getChoresQuery = async (): Promise<string[]> => {
  const connection = connect(config)
  const results = await connection.execute('SELECT list FROM chores LIMIT 1')
  return (results.rows[0] as { list: string }).list.split(', ')
}

export const updateChores = async (chores: string): Promise<void> => {
  const connection = connect(config)
  await connection.execute('UPDATE chores SET list = ? WHERE id = 1', [chores])
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

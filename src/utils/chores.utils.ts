import { createClient } from '@libsql/client'
import { getCurrentWeekNumber } from '../utils/weekend.utils.ts'

const PEOPLE = ['tatiana', 'oskar', 'oliwer']

const client = createClient({
  url: import.meta.env['PUBLIC_DB_URL'],
  authToken: import.meta.env['PUBLIC_DB_AUTH_TOKEN'],
})

export const getChoresQuery = async (): Promise<string[]> => {
  const response = await client.execute('SELECT list from chores')
  const rows = response.rows as unknown as Array<{ list: string }>
  const list = rows[0]?.list || ''

  return list.split(', ')
}

export const updateChores = async (chores: string): Promise<void> => {
  await client.execute({
    sql: 'UPDATE chores SET list = ? WHERE id = 1',
    args: [chores],
  })
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

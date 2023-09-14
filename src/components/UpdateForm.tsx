import {
  getTodos,
  getChoresQuery,
  updateChores,
} from '../utils/chores.utils.ts'

const todos = await getTodos()
const dbList = await getChoresQuery()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const formData = new FormData(e.target as HTMLFormElement)
  const formJson = Object.fromEntries(formData.entries())

  await updateChores(formJson['chores-input'] as string)
  window.history.replaceState({}, '', '/')
  window.location.reload()
}

const getNamesOrder = (): string => {
  const names = dbList
    .map((listChore) => {
      const associatedTodo = todos.find((todo) => todo.chore === listChore)!
      return associatedTodo.name
    })
    .join(', ')

  return names
}

export const UpdateForm = (): JSX.Element => {
  const namesOrder = getNamesOrder()

  return (
    <>
      <h1 className="mb-4">{namesOrder}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="chores-input" className="text-black" />
        <button type="submit" className="ml-3">
          submit
        </button>
      </form>
    </>
  )
}

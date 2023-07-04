import Link from 'next/link'
import { prisma } from './db'
import { TodoItem } from './components/TodoItem'
import { redirect } from 'next/navigation'

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({where:{id}, data:{complete}})
}

export default async function Home(){
   
  const todos = await getTodos()
  // await prisma.todo.create({data: {title:"test", complete: false}})

  return <>
  <header className='flex justify-between items-center mb-4'>
    <h1 className="text-2xl">Todos</h1>
    <Link
    className='border border-slate-100 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none' 
    href="/new">new</Link>
  </header>
  <ul className='pl-4'>
    {todos.map(todo => (
     <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
    ))}
  </ul>
  </>
}
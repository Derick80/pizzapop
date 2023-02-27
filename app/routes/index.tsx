import { Form, NavLink } from '@remix-run/react'
import { useOptionalUser } from '~/lib/app-utils'

export default function Index() {
  const user = useOptionalUser()
  return (
    <div className='flex flex-col items-center'>
      <nav className='flex flex-col w-full items-center justify-between p-2'>

          <div

          >
          <img src='https://remixpizza.s3.us-east-2.amazonaws.com/Pizza/pizzabanner1.jpg' alt='logo'
              style={{ width: '100%', height: '100%' }}

            />
          </div>
            <h1
              className='text-black dark:text-white font-bold text-2xl'
            >
              Pizza Pop
            </h1>
          </nav>
      <h1>Welcome to Pizza Pop</h1>
      {user && <>
      <p
        className='text-center text-sm italic'
      >
        Hello, {user.username}</p>
        <p>You are logged in as {user.email}</p>
      </>}
      <ul>
        <li>
          {user ? (
            <Form
              method='post'
            action='/logout'>
              <button type='submit'>Logout</button>
            </Form>
          ) : (
            <NavLink to='/login'>Login or Register</NavLink>
          )}
        </li>
      </ul>
    </div>
  )
}

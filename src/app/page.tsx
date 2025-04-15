'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Home() {
  const users = useQuery(api.users.getAll)
  return (
    <div>
      <h1 className='text-3xl font-bold'>Hello, Next.js!</h1>
      <p>Welcome to your application!</p>
      <p>Here are the users:</p>
      <ul>
        {users?.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  )
}

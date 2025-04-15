'use client'

import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export default function Home() {
  const user = useQuery(api.users.getCurrentUser)
  return (
    <div>
      <h1 className='text-3xl font-bold'>Hello, Next.js!</h1>
      <p>Welcome to your application!</p>
      <p>Here is the current user:</p>
      {user ? (
        <div>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  )
}

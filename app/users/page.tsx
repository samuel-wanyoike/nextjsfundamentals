import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'users',
}

import React from 'react'

export default async function usersPage() {
  const usersData: Promise<User[]> = getAllUsers()

  const users = await usersData; 

  console.log('hello')
  
  const content = (
    <section>
      <h2>
        <Link href='/'>Back to home page</Link>
      </h2>
      <br />
      {users.map(user => {
        return (
          <>
            <p key={user.id}>
              <Link href={`users/${user.id}`}>{user.name}</Link>
            </p>
          </>
        )
      }) }
    </section>
  )
  return content
}

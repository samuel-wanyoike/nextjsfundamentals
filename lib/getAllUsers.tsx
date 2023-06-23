import React from 'react'

export default async function getAllUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if(!res.ok) return undefined

    //if (!res.ok) throw new Error('Failed to load data')

  return res.json()
}

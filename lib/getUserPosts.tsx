import React from 'react'

export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

    if(!res.ok) return undefined
    // if(!res.ok) throw new Error('failed to fetch posts');

  return res.json()
}

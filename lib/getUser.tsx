import React from 'react'

export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {next: {revalidate: 60}});
                                                                            //used to check is there is new data after 60sec
                                                                            //This is called ISR 
     if(!res.ok) return undefined
    // if(!res.ok) throw new Error('failed to fetch user');

  return res.json()
}

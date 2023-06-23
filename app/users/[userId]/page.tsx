import React from 'react'
import getUser from '@/lib/getUser'
import getAllUsers from '@/lib/getAllUsers'
import getUserPosts from '@/lib/getUserPosts'
import { Suspense } from 'react'
import UserPosts from './components/userPosts'
import { Metadata } from 'next'

import { notFound } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}


export async function generateMetadata({params: {userId }}: Params): Promise<Metadata> {

    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;
    
    //returns the error if the user page is not found
    if(!user.name){
        return {
            title: 'User Not found'
        }
    }
    
    return {
    title: user.name,
    description: `This is the page of ${user.name}`
    }
}


export default async function userPage( {params: {userId }}: Params) {

    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    // getting data in parallel
    // const [user, userPosts] = await Promise.all([userData, userPostsData])

    const user = await userData;

    if(!user.name) return notFound();

    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense  fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} /> 
            </Suspense>
            
        </>
  )
}

//this function converts SSG pages to SSR
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    return users.map(user => ({
        userId: user.id.toString()
    }))
}

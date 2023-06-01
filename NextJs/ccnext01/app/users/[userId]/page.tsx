import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import { Suspense } from "react"
import UserPosts from './components/UserPosts'
import { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'

import { notFound } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({ params: {userId}}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId); 
  const user: User = await userData;
  
  if (!user.name) {
    return {
      title: "User Not Found"
    }
  }

  return {
    title: user.name,
    description: `This is the page of ${user.name}`
  }
}

export default async function UserPage({ params: {userId}}: Params) {
  const userData: Promise<User> = getUser(userId); 
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //the two requests start at the same time; 
  //awaited together, with Promise.all()
  // const [user, userPosts] = await Promise.all([userData, userPostsData]);

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br/>
      <Suspense fallback={<h2>Loading ...</h2>}>
        {/* @ts-expect-error Server COmponent */}
        <UserPosts promise={userPostsData}/>
      </Suspense>
    </>
  )
}

export async function generateStaticParams() {
  //next.js deduplicates the data from fetching
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  return users.map(user => ({ 
    userId: user.id.toString() // all params are strings, but we provide these in advance. Here uesr.id is a number type 
  }));
}

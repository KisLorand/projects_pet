import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import { Suspense } from "react"

type Params = {
    params: {
        userId: string
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
        <UserPosts posts={userPosts}/>
      </Suspense>
    </>
  )
}
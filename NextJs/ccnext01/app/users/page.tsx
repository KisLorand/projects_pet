import type { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Users'
}
//server component; requests during build, before sending to the client
export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    console.log("fetchng on the server comp");

    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br></br>
            {users.map(user => {
                return (
                    <>
                    <p key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            {user.name}
                        </Link>
                    </p>
                    </>
                )
            })}
        </section>
    )

  return content;
}

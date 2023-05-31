import Link from "next/link"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Welcome to the About page'
}

export default function About() {
    return (
        <>
            <h1>About</h1>
            <Link href="/">Link to Home Page</Link>
        </>
    )
}
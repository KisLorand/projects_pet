import Link from "next/link"

export default function Navbar() {
    return (
        <nav>
            <Link href="/"><h1>Home</h1></Link>
            <Link href="/about"><h1>About</h1></Link>
        </nav>
    )
}
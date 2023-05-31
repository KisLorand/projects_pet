type Params = {
    params: {
        userId: string
    }
}

export default function UserPage({ params: {userId}}: Params) {
  return (
    <div>page</div>
  )
}

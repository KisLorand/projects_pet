import React from 'react'

const Login = () => {
  return (
    <section>
        <h1>Login</h1>
        <form>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
            />
        </form>
    </section>
  )
}

export default Login
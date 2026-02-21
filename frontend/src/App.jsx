import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignInButton, SignOutButton, UserButton, SignedOut } from '@clerk/clerk-react'

function App() {
  return (
    <>
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal"> 
          Sign Up
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />

    </>
  )
}

export default App

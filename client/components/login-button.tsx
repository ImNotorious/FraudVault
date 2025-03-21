"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button, type ButtonProps } from "@/components/ui/button"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, type User } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVZGKpDrA8vFyPlJenXwy8f8O-VZcNS6U",
  authDomain: "aeternum-3f8a0.firebaseapp.com",
  projectId: "aeternum-3f8a0",
  storageBucket: "aeternum-3f8a0.appspot.com",
  messagingSenderId: "127865063346",
  appId: "1:127865063346:web:5f3d7427228c015f1f46ab",
};

// Initialize Firebase
console.log("Firebase Config:", firebaseConfig); // Add before initializeApp

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function LoginButton({ children, ...props }: ButtonProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      // The signed-in user info
      const user = result.user
      router.push("/dashboard")
    } catch (error) {
      console.error("Error during sign in:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Error during sign out:", error)
    }
  }

  if (loading) {
    return (
      <Button disabled {...props}>
        Loading...
      </Button>
    )
  }

  if (user) {
    return (
      <Button variant="outline" onClick={handleLogout} {...props}>
        {children || "Sign Out"}
      </Button>
    )
  }

  return (
    <Button onClick={handleLogin} {...props}>
      {children || "Sign In with Google"}
    </Button>
  )
}


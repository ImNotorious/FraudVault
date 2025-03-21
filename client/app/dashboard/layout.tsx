"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { BarChart3, Home, Settings, Shield, Database, AlertTriangle, LogOut, User, Sliders } from "lucide-react"

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
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (!user) {
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2 py-3">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              <span className="text-xl font-bold">FDAM System</span>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard">
                        <Home />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/transactions">
                        <Database />
                        <span>Transactions</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/analytics">
                        <BarChart3 />
                        <span>Analytics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/alerts">
                        <AlertTriangle />
                        <span>Fraud Alerts</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Configuration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/rules">
                        <Sliders />
                        <span>Rule Engine</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard/profile">
                    <User />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}


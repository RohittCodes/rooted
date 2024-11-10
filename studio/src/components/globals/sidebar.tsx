'use client'

import * as React from 'react'
import { Moon, Sun, LogOut, Settings, HelpCircle, BookOpen, Home, User, Menu, Disc, ChartColumn, BookOpenText, Medal } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { signOut } from '@/auth'

export default function AppSidebar() {
  const [open, setOpen] = React.useState(false)

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: BookOpen, label: 'Lessons', href: '/lessons' },
    { icon: Disc, label: 'Community', href: '/community' },
    { icon: ChartColumn, label: 'Analytics', href: '/analytics' },
    { icon: Medal, label: 'Achievements', href: '/achievements' },
    { icon: BookOpenText, label: 'Documentation', href: '/docs' },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href+item.label}
                variant="ghost"
                className="w-full justify-start py-2 px-4 rounded-lg text-left"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 mt-auto">
        <ProfileDropdown />
        <ThemeToggle />
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>
              <img src="/logo.svg" alt="SeniorTech Learning Logo" className="h-8 w-auto" />
            </SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div className="hidden h-screen md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-primary-foreground">
        <div className="flex-1 flex flex-col min-h-0 border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 pb-6 border-b">
              <img src="/logo.svg" alt="SeniorTech Learning Logo" className="h-8 w-auto" />
            </div>
            <SidebarContent />
          </div>
        </div>
      </div>
    </>
  )
}

function ProfileDropdown() {
  const {data: session} = useSession()

  if (!session || !session.user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start mb-2 bg-muted rounded-lg py-6 px-4 shadow-sm border-[2px]">
          <Avatar className="h-8 w-8">
            {session.user.image && session.user.name && <AvatarImage src={session.user.image} alt={session.user.name} />}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>{session.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full justify-start rounded-lg h-10"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="ml-2">Toggle theme</span>
    </Button>
  )
}
import Link from 'next/link'
import Image from 'next/image'
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import { ModeToggle } from './ui/mode-toggle'
import Navigation from './Navigation'
import { navigationItems } from '@/config/navigation'
import { Button } from './ui/button'

function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 w-full shadow-sm'>
      <nav className='flex h-16 items-center justify-between px-4'>
        {/* Logo and Navigation  */}
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            {/* TODO: Change Logo */}
            <Image src='/globe.svg' alt='Logo' width={24} height={24} />
            <span className='hidden font-bold sm:inline-block'>
              Trojan Square
            </span>
          </Link>
          <SignedIn>
            <Navigation navigationItems={navigationItems} />
          </SignedIn>
        </div>

        {/* User Menu and Theme Toggle */}
        <div className='flex items-center gap-4'>
          <ModeToggle />

          {/* If the user is signed out, show sign in and sign up buttons */}
          <SignedOut>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm' className='ml-1'>
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button variant='ghost' size='sm'>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* If the user is signed in, show the user button */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header

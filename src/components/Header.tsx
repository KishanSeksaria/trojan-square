import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import { ModeToggle } from './ui/mode-toggle'

function Header() {
  return (
    <header className='flex h-16 items-center gap-4 p-4'>
      <nav>
        <div className='gap-4'>
          <ModeToggle />
          <SignedOut>
            <SignInButton mode='modal' />
            <SignUpButton mode='modal' />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header

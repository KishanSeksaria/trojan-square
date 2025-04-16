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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import { navigationItems } from '@/config/navigation'
import { Button } from './ui/button'

function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b backdrop-blur'>
      <nav className='flex h-16 items-center justify-between px-4'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/globe.svg' alt='Logo' width={24} height={24} />
            <span className='hidden font-bold sm:inline-block'>
              Trojan Square
            </span>
          </Link>
          <SignedIn>
            <Navigation navigationItems={navigationItems} />
          </SignedIn>
        </div>

        <div className='flex items-center gap-1'>
          <ModeToggle />
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
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

const Navigation = ({
  navigationItems
}: {
  navigationItems: {
    title: string
    href: string
  }[]
}) => (
  <NavigationMenu>
    <NavigationMenuList>
      {navigationItems.map(({ href, title }) => (
        <NavigationMenuItem key={href}>
          <Link href={href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

export default Header

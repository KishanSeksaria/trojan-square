'use client'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'

const Navigation = ({
  navigationItems
}: {
  navigationItems: {
    title: string
    href: string
  }[]
}) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Navigation */}
      <div className='md:hidden'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='h-9 w-9 p-0'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[240px] sm:w-[300px]'>
            <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
            <nav className='mt-8 flex flex-col gap-4'>
              {navigationItems.map(({ href, title }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`px-2 py-1 text-lg ${
                    pathname.includes(href)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:block'>
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map(({ href, title }) => {
              return (
                <NavigationMenuItem key={href}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={pathname.includes(href)}
                    >
                      {title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  )
}

export default Navigation

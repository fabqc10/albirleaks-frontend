import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react'
import AlbirLogo from './albirlogo';
import paths from '@/paths';

const Header = () => {
  return (
   <Navbar shouldHideOnScroll className="shadow mb-6 m-0">
    <NavbarBrand>
        <Link href={"/"}>
            <AlbirLogo />
        </Link>
    </NavbarBrand>
    <NavbarContent justify='center' className="hidden sm:flex gap-4">
        <NavbarItem>
            <Link href={paths.home()}>
                HOME
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link href={paths.about()}>
                ABOUT
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link href={paths.jobs()}>
                JOBS
            </Link>
        </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
   </Navbar>
  )
}

export default Header;
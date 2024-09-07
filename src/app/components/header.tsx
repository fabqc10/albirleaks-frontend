"use client";

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import AlbirLogo from './albirlogo';
import paths from '@/paths';
import { useAuth } from '@/app/contexts/auth.context';

const Header = () => {
  const { user, loading, login, logout } = useAuth();

  return (
    <Navbar shouldHideOnScroll className="shadow mb-6 m-0 z-50">
      <NavbarBrand>
        <Link href="/">
          <AlbirLogo />
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center' className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link href={paths.home()}>HOME</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={paths.about()}>ABOUT</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={paths.jobs()}>JOBS</Link>
        </NavbarItem>
        {!loading && user && <NavbarItem>
          <Link href={paths.myjobs()}>MY JOBS</Link>
        </NavbarItem>}
      </NavbarContent>
      <NavbarContent justify="end">
        {!loading && (
          <>
            {user ? (
              <>
                <NavbarItem className="hidden lg:flex">
                  <Button onClick={logout} color="primary" variant="flat">
                    Logout
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <span>Welcome, {user.name}</span>
                </NavbarItem>
              </>
            ) : (
              <NavbarItem className="hidden lg:flex">
                <Button onClick={login} color="primary" variant="flat">
                  Login
                </Button>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Header;

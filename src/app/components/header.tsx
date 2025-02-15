"use client";

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState, useEffect, Suspense } from 'react';
import AlbirLogo from './albirlogo';
import paths from '@/paths';
import { useAuth } from '@/app/contexts/auth.context';
import styles from './header.module.css';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
  loading: () => null
});

const Header = () => {
  const { user, loading, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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

        <div className="sm:hidden">
          <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </Navbar>

      <Suspense fallback={null}>
        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          user={user}
          loading={loading}
          login={login}
          logout={logout}
          paths={paths}
        />
      </Suspense>
    </>
  );
};

export default Header;

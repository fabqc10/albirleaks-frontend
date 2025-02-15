'use client';

import { Navbar, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './header.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  loading: boolean;
  login: () => void;
  logout: () => void;
  paths: any;
}

const MobileMenu = ({ isOpen, onClose, user, loading, login, logout, paths }: MobileMenuProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      <Navbar className="bg-transparent">
        <NavbarContent className="gap-4">
          <NavbarItem>
            <Link href={paths.home()} onClick={onClose}>HOME</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={paths.about()} onClick={onClose}>ABOUT</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={paths.jobs()} onClick={onClose}>JOBS</Link>
          </NavbarItem>
          {!loading && user && 
            <NavbarItem>
              <Link href={paths.myjobs()} onClick={onClose}>MY JOBS</Link>
            </NavbarItem>
          }
        </NavbarContent>

        <NavbarContent>
          {!loading && (
            <>
              {user ? (
                <>
                  <NavbarItem>
                    <Button onClick={() => {logout(); onClose()}} color="primary" variant="flat">
                      Logout
                    </Button>
                  </NavbarItem>
                  <NavbarItem>
                    <span>Welcome, {user.name}</span>
                  </NavbarItem>
                </>
              ) : (
                <NavbarItem>
                  <Button onClick={() => {login(); onClose()}} color="primary" variant="flat">
                    Login
                  </Button>
                </NavbarItem>
              )}
            </>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default MobileMenu; 
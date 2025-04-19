"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/auth.context';
import paths from '@/paths';
import AlbirLogo from './albirlogo';
import { FcGoogle } from 'react-icons/fc';
import { FiLogOut, FiMenu, FiX, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const Header = () => {
  const { user, loading, login, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: paths.home(), label: 'Inicio' },
    { href: paths.about(), label: 'Sobre Nosotros' },
    { href: paths.jobs(), label: 'Buscar Empleo' },
    ...(user ? [{ href: paths.myjobs(), label: 'Mis Anuncios' }] : []),
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href={paths.home()} className="flex items-center">
                <AlbirLogo />
                <span className="ml-2 text-xl font-bold text-gray-800 hidden sm:inline">AlbirJobs</span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                {loading ? (
                  <FiLoader className="w-5 h-5 text-gray-500 animate-spin" />
                ) : user ? (
                   <Dropdown placement="bottom-end" backdrop="blur">
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        size="sm"
                        src={user.image ?? undefined}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat" disabledKeys={["profile"]}>
                      <DropdownItem key="profile" className="h-14 gap-2 opacity-100">
                        <p className="font-semibold">Sesión iniciada como</p>
                        <p className="font-semibold">{user.email}</p>
                      </DropdownItem>
                      <DropdownItem key="myjobs" href={paths.myjobs()}>Mis Anuncios</DropdownItem>
                      <DropdownItem key="logout" color="danger" onClick={logout}>
                        Cerrar Sesión
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <motion.button
                    onClick={login}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    <FcGoogle />
                    <span>Continuar con Google</span>
                  </motion.button>
                )}
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                  aria-label="Abrir menú"
                >
                  {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-16 md:top-20 z-40 bg-white shadow-lg border-b border-gray-200 md:hidden"
          >
            <nav className="flex flex-col px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200">
                {loading ? (
                   <div className="flex justify-center p-2"><FiLoader className="w-5 h-5 text-gray-500 animate-spin" /></div>
                 ) : user ? (
                  <div className="flex items-center justify-between px-3 py-2">
                     <div className="flex items-center gap-2">
                       <Avatar size="sm" src={user.image ?? undefined} />
                       <span className="text-sm text-gray-800 font-medium">{user.name}</span>
                     </div>
                     <button
                       onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                       className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 text-xs rounded-md hover:bg-red-200 transition-colors"
                     >
                       <FiLogOut className="w-3.5 h-3.5"/> Salir
                     </button>
                  </div>
                 ) : (
                  <button
                    onClick={() => { login(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FcGoogle />
                    <span>Continuar con Google</span>
                  </button>
                 )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

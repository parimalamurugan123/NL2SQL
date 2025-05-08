import React from 'react';
import { motion } from 'framer-motion';
import { Database, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white shadow-sm backdrop-blur-md bg-white/80 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Database className="h-8 w-8 text-sky-500" />
            <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
              NL2SQL
            </h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#demo">Demo</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          
          <button className="md:hidden text-gray-700 hover:text-sky-500 focus:outline-none transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    className="text-gray-700 font-medium hover:text-sky-500 transition-colors relative group"
    whileHover={{ scale: 1.05 }}
  >
    {children}
    <motion.span
      className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 origin-left"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
  </motion.a>
);

export default Header;
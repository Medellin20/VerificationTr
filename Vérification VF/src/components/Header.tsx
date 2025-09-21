import React from 'react';
import { Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-white" />
          <h1 className="text-xl md:text-2xl font-bold text-white">Verifcash</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 text-white">
            <li>
              <a href="/" className="hover:text-red-200 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-200 transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-200 transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
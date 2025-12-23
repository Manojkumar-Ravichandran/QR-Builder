import React from 'react'
import Link from 'next/link';
import { Button } from '../ui/Button';
import { QrCode, Menu } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo/>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-600 hover:text-blue-600 font-medium text-sm">Features</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium text-sm">Pricing</Link>
            {/* <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium text-sm">Enterprise</Link> */}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-slate-600 hover:text-slate-900 font-medium text-sm">Log in</Link>
            <Link href="/login">
              <Button size="sm">Get Started</Button>
            </Link>
            <button className="md:hidden text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
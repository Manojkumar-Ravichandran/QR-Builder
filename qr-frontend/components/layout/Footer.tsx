import { QrCode } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <QrCode className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white">QR Master</span>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between text-slate-400 text-sm">
            <p>&copy; 2024 QR Master SaaS. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import BrandLogo from '../ui/BrandLogo'

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white">
        <BrandLogo/>
    </div>
  )
}

export default Sidebar
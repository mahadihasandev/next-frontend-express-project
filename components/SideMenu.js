'use client';
import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useOutSideClick } from '@/hooks';
import { headerData } from '@/constant/data';

const SideMenu = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sideBarRef = useOutSideClick(onClose);

  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-slate-900/60 backdrop-blur-sm shadow-2xl transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={sideBarRef}
        className={`w-72 bg-white h-screen p-6 border-r border-slate-200/80 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col space-y-1">
            {headerData?.map((item) => {
              const isActive = pathname === item?.href;
              return (
                <Link
                  key={item?.href}
                  href={item?.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                  }`}
                >
                  <span>{item?.title}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
          Cartify Consumer Store • Verified
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
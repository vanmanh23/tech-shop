'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  Menu,
  X
} from 'lucide-react';
// import AdminProtected from '@/components/AdminProtected';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-md
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-100
                    ${pathname === item.href ? 'bg-blue-50 text-blue-600' : ''}
                  `}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`
          lg:ml-64 min-h-screen
          transition-margin duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-64' : 'ml-0'}
        `}>
          <div className="p-8">
            {children}
          </div>
        </main>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
} 
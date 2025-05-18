
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Home, Users, Book, Calendar, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { to: '/home', icon: <Home className="h-5 w-5" />, label: 'Home Feed' },
    { to: '/alumni', icon: <Users className="h-5 w-5" />, label: 'Alumni Portal' },
    { to: '/papers', icon: <Book className="h-5 w-5" />, label: 'Past Papers' },
    { to: '/societies', icon: <Calendar className="h-5 w-5" />, label: 'Societies' },
    { to: '/profile', icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-comsats-gray">
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 w-full z-10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 py-4 px-2">
                    <img 
                      src="/assets/default-avatar.jpg" 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <nav className="flex-1">
                    <ul className="space-y-1 py-2">
                      {links.map((link) => (
                        <li key={link.to} onClick={() => setIsOpen(false)}>
                          <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors ${
                                isActive
                                  ? 'bg-comsats-blue text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`
                            }
                          >
                            {link.icon}
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold text-comsats-blue ml-2">COMSATS Connect</h1>
          </div>
          <div>
            <NavLink to="/profile">
              <img
                src={user?.profilePicture || "/assets/default-avatar.jpg"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </NavLink>
          </div>
        </div>
      </header>

      <main className="pt-14 pb-16 min-h-screen">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around items-center h-14">
          {links.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-2 py-1 transition-colors ${
                  isActive ? 'text-comsats-blue' : 'text-gray-500'
                }`
              }
            >
              {link.icon}
              <span className="text-xs mt-1">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, LayoutGrid, Calendar, User } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="grid grid-cols-5 w-full">
        <NavItem 
          to="/community" 
          isActive={isActive('/community')} 
          icon={<Users size={22} />} 
          label="또상 게시판" 
        />
        
        <NavItem 
          to="/cx" 
          isActive={isActive('/cx')} 
          icon={<LayoutGrid size={22} />} 
          label="게시판" 
        />
        
        <NavItem 
          to="/" 
          isActive={isActive('/')} 
          icon={<Home size={22} />} 
          label="HOME" 
        />
        
        <NavItem 
          to="/schedule" 
          isActive={isActive('/schedule')} 
          icon={<Calendar size={22} />} 
          label="상담" 
        />
        
        <NavItem 
          to="/profile" 
          isActive={isActive('/profile')} 
          icon={<User size={22} />} 
          label="프로필" 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, isActive, icon, label }) => {
  // 타입 오류 해결을 위해 cloneElement 대신 직접 렌더링
  return (
    <Link 
      to={to} 
      className={`
        flex flex-col items-center justify-center
        ${isActive ? 'text-green-500' : 'text-gray-600'}
        relative px-1 py-1
        transition-all duration-200
        active:scale-90 hover:bg-gray-50
      `}
    >
      <div className={`${isActive ? 'text-green-500' : 'text-gray-600'} transition-colors duration-200`}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </Link>
  );
};

export default NavigationBar;
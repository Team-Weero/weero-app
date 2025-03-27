import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home, LayoutGrid, Calendar, User } from 'lucide-react';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      <Link to="/community" className="flex flex-col items-center">
        <Users size={24} />
        <span className="text-xs">또상 게시판</span>
      </Link>
      
      <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-green-500' : ''}`}>
        <LayoutGrid size={24} />
        <span className="text-xs">게시판</span>
      </Link>
      
      <Link to="/home" className="flex flex-col items-center">
        <Home size={24} />
        <span className="text-xs">HOME</span>
      </Link>
      
      <Link to="/schedule" className={`flex flex-col items-center ${location.pathname === '/schedule' ? 'text-green-500' : ''}`}>
        <Calendar size={24} />
        <span className="text-xs">상담</span>
      </Link>
      
      <Link to="/profile" className="flex flex-col items-center">
        <User size={24} />
        <span className="text-xs">프로필</span>
      </Link>
    </div>
  );
};

export default NavigationBar;
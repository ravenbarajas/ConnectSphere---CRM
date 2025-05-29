import { Link, useLocation } from 'wouter';
import { Clock, Send, BarChart3, Tag } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { path: '/dashboard/timeline', icon: Clock, label: 'Timeline', badge: null },
    { path: '/dashboard/followups', icon: Send, label: 'Follow-ups', badge: '3' },
    { path: '/dashboard/leads', icon: BarChart3, label: 'Lead Scoring', badge: null },
    { path: '/dashboard/notes', icon: Tag, label: 'Notes & Tags', badge: null },
  ];

  return (
    <nav className={`fixed left-0 top-[73px] w-64 bg-white border-r border-slate-200 h-[calc(100vh-73px)] transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 z-30`}>
      <div className="p-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.path || (location === '/dashboard' && item.path === '/dashboard/timeline');
            
            return (
              <Link key={item.path} href={item.path}>
                <a className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </Link>
            );
          })}
        </div>
        
        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h3 className="text-sm font-medium text-slate-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Active Clients</span>
              <span className="font-medium text-slate-900">47</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">This Week</span>
              <span className="font-medium text-green-600">+12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Avg. Score</span>
              <span className="font-medium text-slate-900">78</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

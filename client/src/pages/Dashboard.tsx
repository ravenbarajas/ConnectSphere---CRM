import { useState } from 'react';
import { Route, Switch } from 'wouter';
import Sidebar from '@/components/dashboard/Sidebar';
import Timeline from '@/components/dashboard/Timeline';
import FollowUps from '@/components/dashboard/FollowUps';
import LeadScoring from '@/components/dashboard/LeadScoring';
import NotesAndTags from '@/components/dashboard/NotesAndTags';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Menu, Search, Bell } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-semibold text-slate-900 ml-2">ClientPulse Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search clients..."
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2 text-slate-600 hover:text-slate-900">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>
            
            {/* Profile */}
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full mr-2" 
              />
              <span className="text-sm font-medium text-slate-700 hidden md:block">John Doe</span>
            </div>
            
            <Button
              variant="ghost"
              onClick={logout}
              className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
          <div className="p-6">
            <Switch>
              <Route path="/dashboard" component={Timeline} />
              <Route path="/dashboard/timeline" component={Timeline} />
              <Route path="/dashboard/followups" component={FollowUps} />
              <Route path="/dashboard/leads" component={LeadScoring} />
              <Route path="/dashboard/notes" component={NotesAndTags} />
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

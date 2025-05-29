import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MessageSquare, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Interaction, Client } from '@shared/schema';

export default function Timeline() {
  const [clientFilter, setClientFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('30');

  const { data: interactions = [], isLoading: interactionsLoading } = useQuery<Interaction[]>({
    queryKey: ['/api/interactions'],
  });

  const { data: clients = [], isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-blue-600" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-green-600" />;
      case 'meeting':
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5 text-orange-600" />;
      default:
        return <Mail className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100';
      case 'phone':
        return 'bg-green-100';
      case 'meeting':
        return 'bg-purple-100';
      case 'sms':
        return 'bg-orange-100';
      default:
        return 'bg-blue-100';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-blue-100 text-blue-700';
      case 'phone':
        return 'bg-green-100 text-green-700';
      case 'meeting':
        return 'bg-purple-100 text-purple-700';
      case 'sms':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return `Today, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffDays === 2) {
      return `Yesterday, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  if (interactionsLoading || clientsLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Interaction Timeline</h2>
        <p className="text-slate-600">Track all client touchpoints and engagement history</p>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Client</label>
              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Interaction Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Timeline Items */}
      <div className="space-y-4">
        {interactions.map((interaction) => (
          <Card key={interaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`w-10 h-10 ${getIconBg(interaction.type)} rounded-full flex items-center justify-center mr-4`}>
                    {getIcon(interaction.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{interaction.title}</h3>
                    <p className="text-slate-600 mt-1">{interaction.description}</p>
                    <div className="flex items-center mt-2 text-sm text-slate-500">
                      <span>{formatDate(interaction.createdAt!)}</span>
                      <span className="mx-2">•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getBadgeColor(interaction.type)}`}>
                        {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                      </span>
                      {interaction.duration && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{interaction.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {interactions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-slate-400 text-lg mb-2">No interactions found</div>
              <p className="text-slate-500">Start tracking client interactions to see them here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

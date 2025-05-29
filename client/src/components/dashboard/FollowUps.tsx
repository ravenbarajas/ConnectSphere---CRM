import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import type { FollowUp, Client } from '@shared/schema';

export default function FollowUps() {
  const queryClient = useQueryClient();

  const { data: followUps = [], isLoading: followUpsLoading } = useQuery<FollowUp[]>({
    queryKey: ['/api/followups'],
  });

  const { data: clients = [], isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const updateFollowUpMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<FollowUp> }) => {
      return apiRequest('PATCH', `/api/followups/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/followups'] });
    },
  });

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client?.name || 'Unknown Client';
  };

  const getStatusInfo = (scheduledDate: Date | string) => {
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    const diffTime = scheduled.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: 'overdue', color: 'bg-red-100 text-red-700', text: 'Overdue' };
    } else if (diffDays === 0) {
      return { status: 'today', color: 'bg-yellow-100 text-yellow-700', text: 'Today' };
    } else if (diffDays <= 7) {
      return { status: 'this-week', color: 'bg-blue-100 text-blue-700', text: 'This Week' };
    } else {
      return { status: 'upcoming', color: 'bg-gray-100 text-gray-700', text: 'Upcoming' };
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const handleSendFollowUp = (id: number) => {
    updateFollowUpMutation.mutate({
      id,
      data: { completed: true }
    });
  };

  const stats = {
    overdue: followUps.filter(f => getStatusInfo(f.scheduledDate).status === 'overdue').length,
    today: followUps.filter(f => getStatusInfo(f.scheduledDate).status === 'today').length,
    thisWeek: followUps.filter(f => getStatusInfo(f.scheduledDate).status === 'this-week').length,
    completed: followUps.filter(f => f.completed).length,
  };

  if (followUpsLoading || clientsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="ml-3 space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-16"></div>
                  <div className="h-6 bg-slate-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Follow-up Scheduler</h2>
            <p className="text-slate-600">Manage and automate client follow-up communications</p>
          </div>
          <Button className="bg-primary hover:bg-primary-600">
            + Schedule Follow-up
          </Button>
        </div>
      </div>
      
      {/* Follow-up Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600">Overdue</p>
                <p className="text-xl font-bold text-red-600">{stats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600">Today</p>
                <p className="text-xl font-bold text-yellow-600">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600">This Week</p>
                <p className="text-xl font-bold text-blue-600">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Follow-up List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-200">
            {followUps.filter(f => !f.completed).map((followUp) => {
              const statusInfo = getStatusInfo(followUp.scheduledDate);
              return (
                <div key={followUp.id} className="py-4 hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        statusInfo.status === 'overdue' ? 'bg-red-500' :
                        statusInfo.status === 'today' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-slate-900">{getClientName(followUp.clientId)}</h4>
                        <p className="text-sm text-slate-600">{followUp.message}</p>
                        <div className="flex items-center mt-1 text-xs text-slate-500">
                          <span className={`px-2 py-1 rounded-full mr-2 ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                          <span>{formatDate(followUp.scheduledDate)}</span>
                          <span className="mx-2">•</span>
                          <span className={`px-2 py-1 rounded-full ${
                            followUp.type === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {followUp.type.charAt(0).toUpperCase() + followUp.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleSendFollowUp(followUp.id)}
                        disabled={updateFollowUpMutation.isPending}
                        className="bg-primary hover:bg-primary-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Send Now
                      </Button>
                      <Button variant="ghost" className="text-slate-600 hover:text-slate-900 px-3 py-1 text-sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {followUps.filter(f => !f.completed).length === 0 && (
              <div className="py-12 text-center">
                <div className="text-slate-400 text-lg mb-2">No pending follow-ups</div>
                <p className="text-slate-500">All follow-ups are completed or none scheduled.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import type { Client, Note } from '@shared/schema';

export default function NotesAndTags() {
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const tagCounts = {
    'All Clients': clients.length,
    'VIP': clients.filter(c => c.tags.includes('VIP')).length,
    'Follow-Up Urgent': clients.filter(c => c.tags.includes('Follow-up')).length,
    'New Client': clients.filter(c => c.tags.includes('Active')).length,
    'Contract Renewal': clients.filter(c => c.tags.includes('Contract Renewal')).length,
    'Needs Attention': clients.filter(c => c.tags.includes('Needs Attention')).length,
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else if (diffDays <= 14) {
      return '1 week ago';
    } else {
      return '2 weeks ago';
    }
  };

  const getClientAvatar = (name: string) => {
    const avatars = {
      'Sarah Johnson': 'https://pixabay.com/get/gd1127fc046c922990f2e028a1270e13419637ec1bc18030e8e0ce8cf51a1c7b1a6be089861f48fb9339aaf2361dca9523c5b418fdddd22754a022238a586961e_1280.jpg',
      'Michael Chen': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
      'Emma Rodriguez': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
    };
    return avatars[name as keyof typeof avatars] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e2e8f0&color=475569&size=48`;
  };

  const sampleNotes = [
    {
      client: 'Sarah Johnson',
      notes: [
        'Prefers morning appointments. Interested in expanding to a second location. Mentioned budget concerns for new equipment.',
        'Excellent response rate to follow-up emails. Provided referrals to two other salon owners in the area.'
      ]
    },
    {
      client: 'Michael Chen',
      notes: [
        'Contract expires end of Q2. Interested in expanding services to include IP law consultations. Mentioned potential for long-term partnership.',
        'Prompt payment history. Always responds to communications within 24 hours. Appreciates detailed documentation.'
      ]
    },
    {
      client: 'Emma Rodriguez',
      notes: [
        'Has not responded to last three follow-up attempts. Consider alternative communication methods or re-qualification.',
        'Previously very engaged and responsive. Last meaningful interaction was two months ago regarding marketing strategy.'
      ]
    }
  ];

  if (clientsLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full mr-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                  <div className="h-3 bg-slate-200 rounded w-24"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Notes & Tags</h2>
            <p className="text-slate-600">Organize client information with notes and custom tags</p>
          </div>
          <Button className="bg-primary hover:bg-primary-600">
            + Add Note
          </Button>
        </div>
      </div>
      
      {/* Tag Filter Chips */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Filter by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => {
            const colorMap = {
              'All Clients': 'bg-primary-100 text-primary-700 border-primary-200',
              'VIP': 'bg-green-100 text-green-700 border-green-200',
              'Follow-Up Urgent': 'bg-yellow-100 text-yellow-700 border-yellow-200',
              'New Client': 'bg-blue-100 text-blue-700 border-blue-200',
              'Contract Renewal': 'bg-purple-100 text-purple-700 border-purple-200',
              'Needs Attention': 'bg-red-100 text-red-700 border-red-200',
            };
            
            return (
              <Button
                key={tag}
                variant="outline"
                className={`${colorMap[tag as keyof typeof colorMap]} border px-3 py-1 rounded-full text-sm font-medium hover:opacity-80`}
              >
                {tag} ({count})
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Client Notes List */}
      <div className="space-y-4">
        {sampleNotes.map((clientNote, index) => {
          const client = clients.find(c => c.name === clientNote.client);
          if (!client) return null;
          
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <img 
                      src={getClientAvatar(client.name)} 
                      alt={client.name} 
                      className="w-12 h-12 rounded-full mr-4" 
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">{client.name}</h3>
                      <p className="text-sm text-slate-600">{client.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map((tag, tagIndex) => {
                      const tagColors = {
                        'VIP': 'bg-green-100 text-green-700',
                        'Active': 'bg-blue-100 text-blue-700',
                        'Follow-up': 'bg-yellow-100 text-yellow-700',
                        'Contract Renewal': 'bg-purple-100 text-purple-700',
                        'Needs Attention': 'bg-red-100 text-red-700',
                        'Inactive': 'bg-gray-100 text-gray-700',
                      };
                      
                      return (
                        <Badge key={tagIndex} className={tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-700'}>
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {clientNote.notes.map((note, noteIndex) => (
                    <div key={noteIndex} className="bg-slate-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-slate-600">{note}</p>
                        <span className="text-xs text-slate-500 ml-2">{formatDate(new Date(Date.now() - Math.random() * 1000000000))}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="ghost" className="text-primary hover:text-primary-600 text-sm font-medium">
                    + Add Note
                  </Button>
                  <Button variant="secondary" className="px-3 py-1 text-sm">
                    Edit Tags
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {clients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-slate-400 text-lg mb-2">No client notes found</div>
              <p className="text-slate-500">Add clients and notes to organize your information.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

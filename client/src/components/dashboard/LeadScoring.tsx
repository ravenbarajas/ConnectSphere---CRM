import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Client } from '@shared/schema';

export default function LeadScoring() {
  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ['/api/clients'],
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-500', text: 'text-green-600' };
    if (score >= 60) return { bg: 'bg-yellow-500', text: 'text-yellow-600' };
    return { bg: 'bg-red-500', text: 'text-red-600' };
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const scoreDistribution = {
    '90-100': clients.filter(c => c.leadScore >= 90).length,
    '80-89': clients.filter(c => c.leadScore >= 80 && c.leadScore < 90).length,
    '70-79': clients.filter(c => c.leadScore >= 70 && c.leadScore < 80).length,
    '60-69': clients.filter(c => c.leadScore >= 60 && c.leadScore < 70).length,
    'Below 60': clients.filter(c => c.leadScore < 60).length,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-full mr-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                    <div className="h-3 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-8 bg-slate-200 rounded w-12"></div>
                  <div className="h-3 bg-slate-200 rounded w-16 mt-1"></div>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lead Scoring Dashboard</h2>
        <p className="text-slate-600">AI-powered lead scoring based on interaction patterns and engagement</p>
      </div>
      
      {/* Score Distribution Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(scoreDistribution).map(([range, count]) => {
              const percentage = clients.length > 0 ? (count / clients.length) * 100 : 0;
              const color = range === '90-100' || range === '80-89' ? 'bg-green-500' :
                          range === '70-79' ? 'bg-yellow-500' :
                          range === '60-69' ? 'bg-orange-500' : 'bg-red-500';
              
              return (
                <div key={range} className="flex items-center">
                  <span className="w-20 text-sm text-slate-600">{range}</span>
                  <div className="flex-1 mx-4">
                    <Progress value={percentage} className="h-3" />
                  </div>
                  <span className="w-8 text-sm text-slate-900 font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Lead Score Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          const scoreColor = getScoreColor(client.leadScore);
          
          return (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full mr-3 flex items-center justify-center">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{client.name}</h3>
                      <p className="text-sm text-slate-600">{client.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${scoreColor.text}`}>{client.leadScore}</div>
                    <div className="text-xs text-slate-500">Lead Score</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Interaction Frequency</span>
                    <div className="flex items-center">
                      <Progress value={client.leadScore * 0.8} className="w-16 h-2 mr-2" />
                      <span className="text-slate-900 font-medium">{getScoreLevel(client.leadScore * 0.8)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Responsiveness</span>
                    <div className="flex items-center">
                      <Progress value={client.leadScore * 0.9} className="w-16 h-2 mr-2" />
                      <span className="text-slate-900 font-medium">{getScoreLevel(client.leadScore * 0.9)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Recency</span>
                    <div className="flex items-center">
                      <Progress value={client.leadScore * 0.7} className="w-16 h-2 mr-2" />
                      <span className="text-slate-900 font-medium">{getScoreLevel(client.leadScore * 0.7)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {client.tags.map((tag, index) => {
                    const tagColors = {
                      'VIP': 'bg-green-100 text-green-700',
                      'Active': 'bg-blue-100 text-blue-700',
                      'Follow-up': 'bg-yellow-100 text-yellow-700',
                      'Contract Renewal': 'bg-purple-100 text-purple-700',
                      'Needs Attention': 'bg-red-100 text-red-700',
                      'Inactive': 'bg-gray-100 text-gray-700',
                    };
                    
                    return (
                      <span key={index} className={`px-2 py-1 rounded-full text-xs ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-700'}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                
                <Button variant="secondary" className="w-full mt-4">
                  View Full Profile
                </Button>
              </CardContent>
            </Card>
          );
        })}
        
        {clients.length === 0 && (
          <Card className="col-span-3">
            <CardContent className="p-12 text-center">
              <div className="text-slate-400 text-lg mb-2">No clients found</div>
              <p className="text-slate-500">Add clients to see their lead scores here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

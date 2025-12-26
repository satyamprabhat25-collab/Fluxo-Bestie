import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Flag, Users, FileText, Loader2, Check, X, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function Admin() {
  const { user, isAdmin, isModerator, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin || isModerator,
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const handleReportAction = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      await supabase
        .from('reports')
        .update({ status })
        .eq('id', reportId);
      
      toast.success(`Report ${status}`);
      queryClient.invalidateQueries({ queryKey: ['admin-reports'] });
    } catch (error) {
      toast.error('Failed to update report');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (!isAdmin && !isModerator)) {
    return <Navigate to="/" replace />;
  }

  const pendingReports = reports?.filter(r => r.status === 'pending') || [];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container max-w-4xl mx-auto flex items-center gap-4 h-16 px-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-display font-bold text-lg">Admin Panel</h1>
          <Badge variant="secondary" className="ml-auto">
            {isAdmin ? 'Admin' : 'Moderator'}
          </Badge>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-8 px-4">
        <Tabs defaultValue="reports">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="reports" className="gap-2">
              <Flag className="h-4 w-4" />
              Reports
              {pendingReports.length > 0 && (
                <Badge variant="destructive" className="ml-1">{pendingReports.length}</Badge>
              )}
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="reports">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-display font-semibold">Content Reports</h2>
              </div>

              {reportsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : reports && reports.length > 0 ? (
                <div className="divide-y divide-border">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={
                                report.status === 'pending' ? 'destructive' :
                                report.status === 'resolved' ? 'default' : 'secondary'
                              }
                            >
                              {report.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{report.reason}</p>
                          <p className="text-xs text-muted-foreground">
                            {report.reported_post_id ? 'Post reported' : 'User reported'}
                          </p>
                        </div>

                        {report.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              variant="soft"
                              size="sm"
                              onClick={() => handleReportAction(report.id, 'resolved')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReportAction(report.id, 'dismissed')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports</p>
                </div>
              )}
            </div>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="users">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h2 className="font-display font-semibold">User Management</h2>
                </div>

                {usersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : users && users.length > 0 ? (
                  <div className="divide-y divide-border">
                    {users.map((user) => (
                      <div key={user.id} className="p-4 flex items-center gap-4">
                        <div className="flex-1">
                          <p className="font-semibold">{user.display_name}</p>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                        </span>
                        <Link to={`/profile/${user.username}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground">No users</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}

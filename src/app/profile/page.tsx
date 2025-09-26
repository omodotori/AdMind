'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase-client';
import type { User } from 'firebase/auth';
import { AdmindHeader } from '../_components/admind-header';
import { Footer } from '../_components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle, Gem, FileText } from 'lucide-react';
import Link from 'next/link';
import { getProjectsForUser } from '@/lib/db-actions';
import type { Project } from '@/lib/types';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';

const FREE_GENERATION_LIMIT = 5;

function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-white/20 rounded-2xl bg-white/5">
        <p>У вас пока нет проектов.</p>
        <p>Нажмите "Создать новый проект", чтобы начать.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link key={project.id} href={`/project/${project.id}`} passHref>
          <Card
            className="hover:border-primary/80 transition-colors cursor-pointer"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <FileText className="h-6 w-6 text-primary" />
                 <div>
                    <h3 className="font-semibold">{project.brief.productName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Создано: {project.createdAt ? format(new Date(project.createdAt as any), 'dd.MM.yyyy HH:mm') : 'Только что'}
                    </p>
                 </div>
              </div>
               <Button variant="ghost" size="sm">Посмотреть</Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        router.push('/login');
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    if (user) {
      setIsProjectsLoading(true);
      getProjectsForUser(user.uid)
        .then(setProjects)
        .catch(console.error)
        .finally(() => setIsProjectsLoading(false));
    }
  }, [user]);


  const getInitials = (name: string | null | undefined) => {
    if (!name) return '...';
    return name.split(' ').map((n) => n[0]).join('');
  };

  const handleManageSubscription = () => {
    alert('Управление подпиской пока не реализовано.');
  };
  
  const generationsUsed = projects.length;
  const generationsLeft = FREE_GENERATION_LIMIT - generationsUsed;
  const progressPercentage = (generationsUsed / FREE_GENERATION_LIMIT) * 100;

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto max-w-screen-2xl px-4">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="space-y-8 sticky top-24">
                  <Card>
                      <CardHeader>
                        <div className="flex flex-col items-center gap-4 text-center">
                          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                            <AvatarFallback className="text-3xl font-bold">
                              {getInitials(user.displayName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-2xl font-headline">{user.displayName || 'Пользователь'}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">Подписка</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                            <div>
                              <p className="font-semibold">Текущий план</p>
                              <p className="text-primary font-bold text-lg">Бесплатный</p>
                            </div>
                            <Gem className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Использовано генераций</span>
                              <span>{generationsUsed} / {FREE_GENERATION_LIMIT}</span>
                          </div>
                          <Progress value={progressPercentage} />
                        </div>
                        <Button onClick={handleManageSubscription} className="w-full">
                          Перейти на Pro
                        </Button>
                    </CardContent>
                  </Card>
              </div>
            </div>

             {/* Main content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="font-headline text-2xl">Мои проекты</CardTitle>
                      <CardDescription>Здесь отображаются ваши сгенерированные маркетинговые кампании.</CardDescription>
                    </div>
                     <Button asChild>
                        <Link href="/generate">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Создать новый проект
                        </Link>
                     </Button>
                  </div>
                </CardHeader>
                <CardContent>
                    {isProjectsLoading ? (
                       <div className="flex justify-center py-12">
                         <Loader2 className="h-8 w-8 animate-spin" />
                       </div>
                    ) : (
                       <ProjectList projects={projects} />
                    )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { updateProjectAction } from '@/lib/actions';
import { getProjectById } from '@/lib/db-actions';
import type { Project, Brief } from '@/lib/types';
import { auth } from '@/lib/firebase-client';
import { AdmindHeader } from '@/app/_components/admind-header';
import { Footer } from '@/app/_components/footer';
import { BriefForm } from '@/app/_components/brief-form';
import { ResultsDisplay } from '@/app/_components/results-display';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { User } from 'firebase/auth';

export default function ProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!projectId) {
      setError('Project ID is missing.');
      setIsLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        const fetchedProject = await getProjectById(projectId);
        if (fetchedProject) {
          setProject(fetchedProject);
        } else {
          setError('Project not found.');
          toast({
            variant: 'destructive',
            title: 'Ошибка',
            description: 'Проект не найден.',
          });
        }
      } catch (e: any) {
        setError(e.message || 'Failed to fetch project.');
        toast({
            variant: 'destructive',
            title: 'Ошибка загрузки проекта',
            description: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [projectId, router, toast]);

  const handleFormSubmit = async (data: Brief) => {
    if (!user || !projectId) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Не удалось обновить проект. Пользователь не авторизован или ID проекта отсутствует.',
      });
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    try {
      const updatedProjectData = await updateProjectAction(projectId, data, user.uid);
      setProject(updatedProjectData);
      toast({
        title: 'Проект обновлен!',
        description: 'Новый контент был успешно сгенерирован.',
      });
    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred while updating the project.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Ошибка обновления',
        description: errorMessage,
      });
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <AdmindHeader />
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 lg:grid-cols-12">
          {error && !project ? (
             <div className="lg:col-span-12">
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Не удалось загрузить проект</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
             </div>
          ) : project ? (
            <>
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-24">
                  <BriefForm 
                    onSubmit={handleFormSubmit} 
                    isLoading={isUpdating} 
                    initialData={project.brief}
                  />
                </div>
              </div>
              <div className="lg:col-span-8 xl:col-span-9">
                <ResultsDisplay
                  brief={project.brief}
                  initialContent={project.content}
                  isLoading={isUpdating}
                  error={null}
                />
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

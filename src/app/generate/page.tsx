'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Brief, Project, AllContent } from '@/lib/types';
import { generateInitialContent } from '@/lib/actions';
import { AdmindHeader } from '../_components/admind-header';
import { BriefForm } from '../_components/brief-form';
import { ResultsDisplay } from '../_components/results-display';
import { Footer } from '../_components/footer';
import { auth } from '@/lib/firebase-client';
import { Loader2 } from 'lucide-react';
import type { User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [generatedContent, setGeneratedContent] = useState<AllContent | null>(null);
  
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleFormSubmit = async (data: Brief) => {
    if (!user) {
      setError("You must be logged in to generate content.");
      return;
    }
    
    setBrief(data);
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    
    try {
      // In a real app, you would fetch the user's subscription status
      const isPro = false; 
      const { content, projectId } = await generateInitialContent(data, user.uid, isPro);
      
      setGeneratedContent(content);
      
      // Update the URL without a full page reload to reflect the new project ID
      router.push(`/project/${projectId}`, { scroll: false });
      
      toast({
        title: 'Контент успешно сгенерирован!',
      });

    } catch (e: any) {
      const errorMessage = e.message || 'An error occurred while generating content. Please try again.';
      setError(errorMessage);
      setBrief(null);
      toast({
        variant: 'destructive',
        title: 'Ошибка генерации',
        description: errorMessage,
      });
      console.error(e);
    } finally {
      setIsLoading(false); 
    } 
  };
  
  if (isAuthLoading) {
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
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24">
              <BriefForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
             <ResultsDisplay
              brief={brief}
              initialContent={generatedContent}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

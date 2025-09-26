'use client';

import { useState, useEffect } from 'react';
import type { Brief, AllContent } from '@/lib/types';
import { AdmindHeader } from '../_components/admind-header';
import { ResultsDisplay } from '../_components/results-display';
import { Footer } from '../_components/footer';
import { WelcomeMessage } from '../_components/welcome-message';
import { useRouter } from 'next/navigation';

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [generatedContent, setGeneratedContent] = useState<AllContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This page is now deprecated in favor of /project/[id]
    // It's kept for backward compatibility during the transition,
    // but we should redirect users away from it.
    router.replace('/generate');
    
    // The old logic is kept here just in case, but won't be executed
    try {
      const contentJson = sessionStorage.getItem('generatedContent');
      const briefJson = sessionStorage.getItem('brief');

      if (contentJson && briefJson) {
        setGeneratedContent(JSON.parse(contentJson));
        setBrief(JSON.parse(briefJson));
      } else {
        // If no content, redirect to create a new one
        router.replace('/generate');
        return;
      }
    } catch (e) {
      console.error('Failed to parse content from session storage', e);
      setError('Could not load generated content.');
      router.replace('/generate');
      return;
    } finally {
      setIsLoading(false);
    }
  }, [router]);
  
  if (isLoading || !brief || !generatedContent) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Перенаправление...</p>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <AdmindHeader />
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        <div className="mx-auto max-w-screen-2xl">
           <ResultsDisplay
              brief={brief}
              initialContent={generatedContent}
              isLoading={isLoading}
              error={error}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}

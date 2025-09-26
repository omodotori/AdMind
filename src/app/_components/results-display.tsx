'use client';

import { motion } from 'framer-motion';
import { StrategyCard } from './strategy-card';
import { ContentIdeasCard } from './content-ideas-card';
import { ContentPlanCard } from './content-plan-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { AllContent, Brief } from '@/lib/types';
import { WelcomeMessage } from './welcome-message';
import { ExportCard } from './export-card';

interface ResultsDisplayProps {
  initialContent: AllContent | null;
  brief: Brief | null;
  isLoading: boolean;
  error: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export function ResultsDisplay({
  initialContent,
  brief,
  isLoading,
  error,
}: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/3 rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Ошибка генерации</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (!initialContent || !brief) {
    return <WelcomeMessage />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
         <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight">Ваши маркетинговые материалы</h2>
         <p className="text-muted-foreground text-lg">Сгенерировано для "{brief.productName}"</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
           <motion.div variants={itemVariants}>
              <StrategyCard strategy={initialContent.strategy} />
           </motion.div>
           <motion.div variants={itemVariants}>
             <ContentIdeasCard initialContent={initialContent.social} brief={brief} />
           </motion.div>
        </div>
        <div className="lg:col-span-1 space-y-8 sticky top-24">
            <motion.div variants={itemVariants}>
                <ExportCard allContent={initialContent} />
            </motion.div>
        </div>
      </div>

      <motion.div variants={itemVariants}>
        <ContentPlanCard contentPlan={initialContent.contentPlan} />
      </motion.div>

    </motion.div>
  );
}

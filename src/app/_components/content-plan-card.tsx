'use client';

import { CalendarDays } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GenerateContentPlanOutput } from '@/lib/types';
import { CopyButton } from './copy-button';

interface ContentPlanCardProps {
  contentPlan: GenerateContentPlanOutput;
}

const dayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export function ContentPlanCard({ contentPlan }: ContentPlanCardProps) {
  if (!contentPlan?.contentPlan) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Контент-план на неделю</CardTitle>
        </div>
        <CardDescription>
          Готовый план публикаций на 7 дней для ваших социальных сетей.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contentPlan.contentPlan.map((item) => (
            <div key={item.day} className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg text-foreground">
                        {dayNames[item.day - 1] || `День ${item.day}`}
                    </h4>
                    <div className="flex items-center gap-2 text-xs">
                        <Badge variant="secondary" className="truncate">{item.theme}</Badge>
                        <Badge variant="outline">{item.format}</Badge>
                    </div>
                </div>
                <div className="relative flex-grow rounded-lg bg-background/40 p-3 shadow-inner">
                    <CopyButton textToCopy={item.idea} className="absolute top-1 right-1" />
                    <p className="whitespace-pre-wrap font-mono text-sm text-foreground/80 pr-8">
                        {item.idea}
                    </p>
                </div>
            </div>
          ))}
           <div className="flex flex-col gap-4 rounded-xl border-2 border-dashed border-white/10 items-center justify-center p-4 text-center md:col-span-2 lg:col-span-1 xl:col-span-3">
             <div className="text-muted-foreground">
                <p className="font-bold text-lg">Скоро здесь будет больше дней!</p>
                <p className="text-sm">Мы работаем над расширением планировщика.</p>
             </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}

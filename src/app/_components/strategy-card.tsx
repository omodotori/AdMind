'use client';

import { Lightbulb } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { GenerateMarketingStrategyOutput } from '@/lib/types';
import { CopyButton } from './copy-button';

interface StrategyCardProps {
  strategy: GenerateMarketingStrategyOutput;
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  const fullStrategyText = `
Target Audience Analysis:
${strategy.targetAudienceAnalysis}

Key Message:
${strategy.keyMessage}

Platform Suggestions:
${strategy.platformSuggestions}
${
  strategy.specialAccommodations
    ? `\nSpecial Accommodations:\n${strategy.specialAccommodations}`
    : ''
}
  `.trim();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Marketing Strategy</CardTitle>
          </div>
          <CopyButton textToCopy={fullStrategyText} />
        </div>
        <CardDescription>
          High-level marketing strategy based on your brief.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
          <AccordionItem value="item-1" className="border-b-white/10">
            <AccordionTrigger className="font-semibold">Target Audience Analysis</AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap text-base">
              {strategy.targetAudienceAnalysis}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-white/10">
            <AccordionTrigger className="font-semibold">Key Message</AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap text-base">
              {strategy.keyMessage}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-white/10">
            <AccordionTrigger className="font-semibold">Platform Suggestions</AccordionTrigger>
            <AccordionContent className="whitespace-pre-wrap text-base">
              {strategy.platformSuggestions}
            </AccordionContent>
          </AccordionItem>
          {strategy.specialAccommodations && (
             <AccordionItem value="item-4" className="border-b-transparent">
             <AccordionTrigger className="font-semibold">Special Accommodations</AccordionTrigger>
             <AccordionContent className="whitespace-pre-wrap text-base">
               {strategy.specialAccommodations}
             </AccordionContent>
           </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}

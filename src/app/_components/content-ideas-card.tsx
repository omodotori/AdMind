'use client';

import { useState } from 'react';
import { MessageSquare, Loader2, WandSparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { generateContentIdeasAction, refineContentAction, translateContentAction, seoOptimizeContentAction, type GenerateContentIdeasOutput, type Brief } from '@/lib/actions';
import { CopyButton } from './copy-button';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContentIdeasCardProps {
  initialContent: GenerateContentIdeasOutput;
  brief: Brief;
}

type Format = 'Instagram Post' | 'Blog Post' | 'Video Idea';
const formats: Format[] = ['Instagram Post', 'Blog Post', 'Video Idea'];

type RefineAction = 'improve' | 'translate_ru' | 'translate_kk' | 'seo';

function RefineModal({
  isOpen,
  onClose,
  originalContent,
  onRefine,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  onRefine: (action: RefineAction, instruction?: string, keywords?: string) => Promise<void>;
  isLoading: boolean;
}) {
  const [action, setAction] = useState<RefineAction>('improve');
  const [instruction, setInstruction] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action === 'improve' && !instruction.trim()) return;
    if (action === 'seo' && !keywords.trim()) return;
    onRefine(action, instruction, keywords);
  };
  
  const isInstructionDisabled = action !== 'improve' || isLoading;
  const isKeywordsDisabled = action !== 'seo' || isLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Улучшить или перевести текст</DialogTitle>
            <DialogDescription>
              Выберите действие, которое хотите совершить с текстом.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="space-y-2">
              <Label>Оригинальный текст</Label>
              <Textarea readOnly value={originalContent} className="h-32 bg-background/50" />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="action-select">Действие</Label>
                <Select
                  value={action}
                  onValueChange={(value) => setAction(value as RefineAction)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="action-select">
                    <SelectValue placeholder="Выберите действие" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="improve">Улучшить (по инструкции)</SelectItem>
                    <SelectItem value="seo">Оптимизировать для SEO</SelectItem>
                    <SelectItem value="translate_ru">Перевести на Русский</SelectItem>
                    <SelectItem value="translate_kk">Перевести на Казахский</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instruction">Инструкция для AI</Label>
              <Input
                id="instruction"
                placeholder="Например, сделай этот текст более смешным"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                disabled={isInstructionDisabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Ключевые слова для SEO</Label>
              <Input
                id="keywords"
                placeholder="Например: AI, маркетинг, Казахстан"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={isKeywordsDisabled}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isLoading}>
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading || (action === 'improve' && !instruction.trim()) || (action === 'seo' && !keywords.trim())}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Выполнить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export function ContentIdeasCard({
  initialContent,
  brief,
}: ContentIdeasCardProps) {
  const [content, setContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);
  const { toast } = useToast();

  const handleFormatChange = async (format: Format) => {
    setIsGenerating(true);
    try {
      const newContent = await generateContentIdeasAction(brief, format);
      setContent(newContent);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Ошибка генерации контента',
        description: 'Не удалось сгенерировать новый контент. Попробуйте снова.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleRefine = async (action: RefineAction, instruction?: string, keywords?: string) => {
    setIsRefining(true);
    try {
      let newContent = '';
      let toastTitle = '';

      if (action === 'improve') {
        if (!instruction) throw new Error('Instruction is required for improvement.');
        const { refinedContent } = await refineContentAction({
            originalContent: content.content,
            instruction,
        });
        newContent = refinedContent;
        toastTitle = 'Текст улучшен!';
      } else if (action === 'seo') {
        if (!keywords) throw new Error('Keywords are required for SEO optimization.');
         const { optimizedContent } = await seoOptimizeContentAction({
            originalContent: content.content,
            keywords,
        });
        newContent = optimizedContent;
        toastTitle = 'Текст оптимизирован для SEO!';
      }
      else {
        const lang = action === 'translate_ru' ? 'ru' : 'kk';
        const { translatedContent } = await translateContentAction({
            content: content.content,
            targetLanguage: lang,
        });
        newContent = translatedContent;
        toastTitle = `Текст переведен на ${lang === 'ru' ? 'русский' : 'казахский'}!`;
      }

      setContent({ content: newContent });
      toast({ title: toastTitle });
      setIsRefineModalOpen(false);

    } catch (error) {
       console.error(error);
       toast({
         variant: 'destructive',
         title: 'Ошибка',
         description: 'Не удалось выполнить действие. Попробуйте снова.',
       });
    } finally {
        setIsRefining(false);
    }
  }

  const isLoading = isGenerating || isRefining;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">Идеи для контента</CardTitle>
            </div>
            <Select
              defaultValue="Instagram Post"
              onValueChange={(value: Format) => handleFormatChange(value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardDescription>
            AI-контент, созданный для вашей аудитории в RU/KZ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-xl bg-black/20 p-6 shadow-inner min-h-[200px] border border-white/10">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
                <span className="ml-2 text-white">{isRefining ? "Обработка..." : "Генерация..."}</span>
              </div>
            )}
            <div className="flex items-start justify-between gap-2">
              <p className="flex-1 whitespace-pre-wrap text-base text-foreground/90">
                {content.content}
              </p>
              <div className="flex flex-col items-center gap-1">
                <CopyButton textToCopy={content.content} className="flex-shrink-0" />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsRefineModalOpen(true)}>
                  <WandSparkles className="h-4 w-4" />
                   <span className="sr-only">Улучшить или перевести текст</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <RefineModal 
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        originalContent={content.content}
        onRefine={handleRefine}
        isLoading={isRefining}
      />
    </>
  );
}

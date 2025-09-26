'use client';

import { Download, Share2, Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { AllContent } from '@/lib/types';

interface ExportCardProps {
    allContent: AllContent;
}

export function ExportCard({ allContent }: ExportCardProps) {
  const { toast } = useToast();

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Ссылка на проект скопирована!',
        description: 'Теперь вы можете поделиться ссылкой на эту страницу.',
      });
    }
  };

  const handleDownload = () => {
    const { strategy, social, contentPlan } = allContent;

    let textContent = "СГЕНЕРИРОВАНО ADMIND\n\n";
    textContent += "==============================\n";
    textContent += "МАРКЕТИНГОВАЯ СТРАТЕГИЯ\n";
    textContent += "==============================\n\n";
    textContent += `Анализ целевой аудитории:\n${strategy.targetAudienceAnalysis}\n\n`;
    textContent += `Ключевое сообщение:\n${strategy.keyMessage}\n\n`;
    textContent += `Предложения по платформам:\n${strategy.platformSuggestions}\n\n`;
    if (strategy.specialAccommodations) {
        textContent += `Особые рекомендации:\n${strategy.specialAccommodations}\n\n`;
    }

    textContent += "==============================\n";
    textContent += "ИДЕИ ДЛЯ КОНТЕНТА\n";
    textContent += "==============================\n\n";
    textContent += `${social.content}\n\n`;

    textContent += "==============================\n";
    textContent += "КОНТЕНТ-ПЛАН НА НЕДЕЛЮ\n";
    textContent += "==============================\n\n";
    
    const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    contentPlan.contentPlan.forEach(day => {
        textContent += `--- ${dayNames[day.day - 1]} ---\n`;
        textContent += `Тема: ${day.theme}\n`;
        textContent += `Формат: ${day.format}\n`;
        textContent += `Идея: ${day.idea}\n\n`;
    });
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admind_content.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Загрузка началась!',
      description: 'Файл admind_content.txt был сохранен.',
    });
  }

  const launchChecklist = [
    'Проверить грамматику и орфографию',
    'Адаптировать контент под tone of voice',
    'Проверить релевантность хэштегов',
    'Подготовить изображения и видео',
    'Составить контент-план',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Экспорт и запуск</CardTitle>
        <CardDescription>
          Все готово для запуска вашей кампании.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <h3 className="font-semibold mb-4 text-lg">Чек-лист запуска</h3>
            <ul className="space-y-3">
                {launchChecklist.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                           <Check className="h-4 w-4 text-green-400" />
                        </div>
                        <span className="text-base text-muted-foreground">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Скачать .txt
          </Button>
          <Button onClick={handleShare} variant="outline" className="w-full" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            Поделиться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

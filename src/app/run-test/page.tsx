'use client';

import { useState, useEffect } from 'react';
import { AdmindHeader } from '../_components/admind-header';
import { Footer } from '../_components/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import {
  generateInitialContent,
  refineContentAction,
  translateContentAction,
  seoOptimizeContentAction,
} from '@/lib/actions';
import type { GenerateMarketingStrategyOutput } from '@/lib/actions';

type TestResult = {
    name: string;
    status: 'pending' | 'success' | 'error';
    result?: any;
    error?: string;
    duration?: number;
};

const mockBrief = {
  productName: 'Маленькая кофейня в центре Алматы',
  productDescription: 'Уютное место с отличным кофе и свежей выпечкой.',
  category: 'food',
  region: 'Алматы',
  goal: 'brand' as 'brand',
  platforms: ['instagram'],
  toneOfVoice: 'friendly',
  keywords: 'кофе, завтрак, Алматы',
};

const tests: { name: string; run: () => Promise<any> }[] = [
  {
    name: 'Полная генерация (Стратегия, Идеи, План)',
    run: () => generateInitialContent(mockBrief, 'test-user-id', true),
  },
  {
      name: 'Улучшение контента',
      run: () => refineContentAction({
          originalContent: 'Мы продаем кофе. Он вкусный. Приходите.',
          instruction: 'Сделай этот текст более привлекательным и аппетитным для соцсетей.',
      })
  },
  {
      name: 'Перевод контента (на казахский)',
      run: () => translateContentAction({
          content: 'Привет, мир! Как дела?',
          targetLanguage: 'kk'
      })
  },
  {
      name: 'SEO-оптимизация контента',
      run: () => seoOptimizeContentAction({
          originalContent: 'Наш фитнес-клуб предлагает отличные условия для тренировок. У нас есть все необходимые тренажеры для достижения ваших целей. Присоединяйтесь к нам!',
          keywords: 'фитнес клуб алматы, тренажерный зал, персональные тренировки'
      })
  }
];

function TestResultCard({ test }: { test: TestResult }) {
    const getStatusIcon = () => {
        switch(test.status) {
            case 'success': return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'error': return <XCircle className="h-6 w-6 text-red-500" />;
            case 'pending': return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
            default: return null;
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                    {getStatusIcon()}
                </div>
                {test.duration && <CardDescription>Выполнено за {(test.duration / 1000).toFixed(2)}с</CardDescription>}
            </CardHeader>
            <CardContent>
                {test.status === 'success' && test.result && (
                    <div className="p-4 bg-black/30 border border-white/10 rounded-lg max-h-60 overflow-y-auto">
                        <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify(test.result, null, 2)}
                        </pre>
                    </div>
                )}
                {test.status === 'error' && test.error && (
                     <div className="p-4 bg-red-900/50 border border-red-400/30 text-red-200 rounded-lg">
                        <p className="font-semibold text-white">Ошибка:</p>
                        <p className="text-xs whitespace-pre-wrap break-words">{test.error}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


export default function RunTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>(
      tests.map(t => ({ name: t.name, status: 'pending' }))
  );
  const [isRunning, setIsRunning] = useState(false);

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults(tests.map(t => ({ name: t.name, status: 'pending' })));

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        const startTime = Date.now();
        try {
            const result = await test.run();
            const duration = Date.now() - startTime;
            setTestResults(prev => prev.map(r => r.name === test.name ? { ...r, status: 'success', result, duration } : r));
        } catch (e: any) {
            const duration = Date.now() - startTime;
            console.error(`Test "${test.name}" failed:`, e);
            setTestResults(prev => prev.map(r => r.name === test.name ? { ...r, status: 'error', error: e.message, duration } : r));
        }
    }

    setIsRunning(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow container mx-auto px-4 py-16">
        <Card className="w-full max-w-4xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Интеграционное тестирование AI</CardTitle>
            <CardDescription>
              Нажмите кнопку ниже, чтобы запустить серию тестовых запросов ко всем основным AI-функциям. Это поможет убедиться, что всё работает корректно.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              className="w-full"
              size="lg"
            >
              {isRunning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isRunning ? 'Тестирование...' : 'Запустить все тесты'}
            </Button>
            
            <div className="space-y-4">
                {testResults.map((test) => (
                    <TestResultCard key={test.name} test={test} />
                ))}
            </div>

          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

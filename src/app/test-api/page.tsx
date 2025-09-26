'use client';

import { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { testApi } from '@/ai/flows/test-api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestApiPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('Hello, world!');

  const handleTest = async () => {
    if (!query) {
      setError('Please enter a query.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await testApi({ query });
      setResult(response.response);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader>
            <CardTitle>Проверка Gemini API</CardTitle>
            <CardDescription>
              Введите любой текст в поле ниже, чтобы AI сгенерировал ответ. Это проверит работоспособность API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name-input">Ваш запрос</Label>
              <Input
                id="name-input"
                placeholder="Например, 'Сколько планет в солнечной системе?'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTest();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleTest}
              disabled={isLoading || !query}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Отправить запрос к AI
            </Button>
            {result && (
              <div className="p-4 bg-green-900/50 border border-green-400/30 text-green-200 rounded-lg">
                <p className="font-semibold text-white">Ответ от AI:</p>
                <p>{result}</p>
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-400/30 text-red-200 rounded-lg">
                <p className="font-semibold text-white">Ошибка:</p>
                <p className="whitespace-pre-wrap break-words">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

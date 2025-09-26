'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { type Brief, BriefSchema } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

interface BriefFormProps {
  onSubmit: (data: Brief) => void;
  isLoading: boolean;
  initialData?: Brief;
}

const platforms = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'telegram', label: 'Telegram' },
];

export function BriefForm({ onSubmit, isLoading, initialData }: BriefFormProps) {
  const form = useForm<Brief>({
    resolver: zodResolver(BriefSchema),
    defaultValues: initialData || {
      productName: '',
      productDescription: '',
      category: '',
      price: '',
      region: '',
      goal: 'brand',
      platforms: [],
      toneOfVoice: 'friendly',
      keywords: '',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Маркетинговый бриф</CardTitle>
        <CardDescription>
          Заполните детали ниже для генерации маркетинговых материалов.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цель</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите цель кампании" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="traffic">Трафик</SelectItem>
                      <SelectItem value="leads">Лиды</SelectItem>
                      <SelectItem value="brand">Узнаваемость бренда</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platforms"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Платформы</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {platforms.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="toneOfVoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тон голоса</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тон" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Профессиональный</SelectItem>
                      <SelectItem value="friendly">Дружелюбный</SelectItem>
                      <SelectItem value="humorous">Юмористичный</SelectItem>
                      <SelectItem value="confident">Уверенный</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Город/Регион</FormLabel>
                  <FormControl>
                    <Input placeholder="Например, Алматы" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название продукта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Например, 'AdMind AI-Маркетолог'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Короткое описание</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="AI-ассистент для создания маркетинговых стратегий и контента..."
                      className="min-h-[100px]"
                      maxLength={200}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tech">Технологии</SelectItem>
                      <SelectItem value="food">Еда и напитки</SelectItem>
                      <SelectItem value="services">Услуги</SelectItem>
                      <SelectItem value="retail">Ритейл</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена (опционально)</FormLabel>
                  <FormControl>
                    <Input placeholder="Например, 10000 тг" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ключевые слова (опционально)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Например: AI, маркетинг, Казахстан"
                      className="min-h-[80px]"
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? 'Генерация...' : 'Сгенерировать'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

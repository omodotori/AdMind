'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AdmindHeader } from '../_components/admind-header';
import { Footer } from '../_components/footer';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase-client';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email.' }),
  password: z.string().min(1, { message: 'Пароль не может быть пустым.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function GoogleIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.612-3.512-11.284-8.28l-6.573 4.818C9.655 39.663 16.318 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.591 35.013 48 29.837 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
      </svg>
    );
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({
            title: 'Успешный вход через Google',
        });
        // Redirect is handled by AdmindHeader's onAuthStateChanged
    } catch (error: any) {
        console.error("Google popup sign-in error", error);
        toast({
          variant: 'destructive',
          title: 'Ошибка входа через Google',
          description: error.message || 'Произошла ошибка. Попробуйте снова.',
        });
    } finally {
        setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Успешный вход",
        description: "Вы будете перенаправлены на страницу профиля.",
      });
      // Navigation is handled by AdmindHeader's onAuthStateChanged
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Ошибка входа',
        description: error.message || 'Произошла ошибка. Попробуйте снова.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const pageIsLoading = isLoading || isGoogleLoading;

  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow container mx-auto flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Вход</CardTitle>
            <CardDescription>
              Введите свои данные для доступа к AdMind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} disabled={pageIsLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={pageIsLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={pageIsLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Войти
                </Button>
              </form>
            </Form>
            <div className="relative my-4 flex items-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="mx-4 flex-shrink text-xs uppercase text-muted-foreground">
                  Или
                </span>
                <div className="flex-grow border-t border-muted"></div>
            </div>
             <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={pageIsLoading}>
                {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <GoogleIcon />
                <span className="ml-2">Продолжить с Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Нет аккаунта?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Зарегистрируйтесь
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

import { AdmindHeader } from '../_components/admind-header';
import { Footer } from '../_components/footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">Контакты</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Мы всегда рады ответить на ваши вопросы.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader className="items-center text-center">
                    <Mail className="h-10 w-10 text-primary mb-4" />
                    <CardTitle className="font-headline">Электронная почта</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-2">Для вопросов и предложений:</p>
                    <a href="mailto:hello@admind.ai" className="text-lg font-semibold text-primary hover:underline">
                        hello@admind.ai
                    </a>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="items-center text-center">
                    <MapPin className="h-10 w-10 text-primary mb-4" />
                    <CardTitle className="font-headline">Наш адрес</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                     <p className="text-muted-foreground mb-2">Наш офис находится по адресу:</p>
                    <p className="text-lg font-semibold">
                        г. Алматы, Казахстан <br/>
                        ул. Инноваций, 1, офис 101
                    </p>
                </CardContent>
            </Card>
        </div>

      </main>
      <Footer />
    </div>
  );
}

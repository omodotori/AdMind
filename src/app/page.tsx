import { AdmindHeader } from './_components/admind-header';
import { Footer } from './_components/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, Target, BarChart, Check, Instagram, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroBackground } from './_components/hero-background';

const featureCards = [
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Комплексная стратегия',
    description:
      'Получите полную маркетинговую стратегию на основе вашего брифа.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Контент для соцсетей',
    description: 'Создавайте посты для Instagram, Facebook, и других сетей.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Контент-план на неделю',
    description: 'Получите готовую сетку публикаций на 7 дней вперед.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: 'Адаптация под платформы',
    description: 'Контент создается с учетом специфики выбранных соцсетей.',
  },
];

const whoIsItFor = [
  {
    title: 'Малый бизнес',
    description:
      'Запустите маркетинговые кампании без больших бюджетов и команды.',
  },
  {
    title: 'Стартапы',
    description:
      'Быстро тестируйте гипотезы и находите свой голос на рынке.',
  },
  {
    title: 'Маркетологи',
    description:
      'Автоматизируйте рутинные задачи и сфокусируйтесь на стратегии.',
  },
  {
    title: 'Фрилансеры',
    description: 'Предлагайте клиентам качественный контент и стратегии.',
  },
];

const examplePosts = [
    {
      platform: "Instagram Post",
      title: "Кофейня 'Уютный Уголок'",
      content: "Начните свой день правильно! ☕️✨ Запах свежесваренного кофе, хрустящие круассаны и атмосфера, в которой хочется творить. Мы не просто кофейня, мы — ваш второй дом. Ждём в 'Уютном Уголке'! #кофеалматы #доброеутро",
    },
    {
      platform: "Telegram Канал",
      title: "Книжный магазин 'Читай-Город'",
      content: "📚 Новинка на полках! 'Хроники кремниевой долины' — захватывающая история о том, как технологии меняют мир. Первым 10 покупателям — скидка 15% по промокоду TELEGRAM15. Успейте забрать свой экземпляр!",
    },
    {
      platform: "Facebook Post",
      title: "Онлайн-курсы 'SkillUp'",
      content: "Хотите сменить профессию, но не знаете, с чего начать? 🤔 Наш новый курс 'Основы Python для начинающих' — это ваш билет в мир IT. Никакой воды, только практика. Первый урок — бесплатно! Регистрируйтесь по ссылке в профиле.",
    },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative container mx-auto px-4 text-center overflow-hidden flex items-center justify-center min-h-[90vh]"
        >
          <HeroBackground />
          <div className="relative z-10">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-6xl">
              Ваш AI-ассистент по текстовому маркетингу
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Создавайте маркетинговые стратегии и контент для соцсетей за считанные минуты.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/generate">Попробовать бесплатно</Link>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
              >
                <Link href="/demo">
                  Посмотреть демо <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-card/30 py-24 sm:py-32 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold">Как это работает?</h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/20">
                  1
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">Заполните бриф</h3>
                <p className="mt-2 text-muted-foreground">
                  Опишите ваш бизнес, цели и аудиторию.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/20">
                  2
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">
                  AI генерирует контент
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Наш AI создаст для вас полный набор текстовых материалов.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/20">
                  3
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">
                  Используйте и адаптируйте
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Копируйте, редактируйте и запускайте кампании.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold">
              Все, что нужно для текстового маркетинга
            </h2>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featureCards.map((feature, index) => (
                <div
                  key={index}
                >
                  <Card className="h-full transform transition-transform duration-300 hover:-translate-y-2">
                    <CardHeader className="items-center text-center">
                      {feature.icon}
                      <CardTitle className="font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* "Для кого" Section */}
        <section className="bg-card/30 py-24 sm:py-32 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold">Для кого это?</h2>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {whoIsItFor.map((item, index) => (
                 <div 
                    key={index}
                    className="rounded-2xl bg-card p-8 transition-shadow duration-300 transform hover:-translate-y-2 border border-white/10 shadow-xl shadow-black/20 hover:shadow-primary/20"
                  >
                   <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                   <p className="mt-4 text-muted-foreground">{item.description}</p>
                 </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold">Выберите свой план</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
              Начните бесплатно и переходите на платный тариф по мере роста.
            </p>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
              {/* Free Plan */}
              <Card className="flex flex-col">
                <CardHeader className="flex-1">
                  <p className="font-semibold text-primary">Бесплатно</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl font-bold">$0</span>
                     <span className="text-muted-foreground">/ всегда</span>
                  </div>
                  <p className="text-muted-foreground pt-4">Для тех, кто хочет попробовать основные функции.</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ul className="space-y-3">
                    {[
                      '5 бесплатных генераций',
                      'Генерация стратегии и текстов',
                      'Контент-план на неделю',
                      'Поддержка в сообществе',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <Button asChild size="lg" variant="outline" className="mt-6 w-full">
                     <Link href="/signup">Начать бесплатно</Link>
                   </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative flex flex-col border-2 border-primary shadow-2xl shadow-primary/20">
                 <div className="absolute top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    Популярный
                 </div>
                <CardHeader className="flex-1">
                  <p className="font-semibold text-primary">Pro</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl font-bold">$10</span>
                     <span className="text-muted-foreground">/ месяц</span>
                  </div>
                  <p className="text-muted-foreground pt-4">Для профессионалов, которым нужен полный доступ.</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <ul className="space-y-3">
                    {[
                      'Неограниченные генерации',
                      'Все функции бесплатного тарифа',
                      'Расширенные настройки генерации',
                      'Сохранение истории проектов',
                      'Приоритетная поддержка',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="mt-6 w-full">
                     <Link href="/signup">Перейти на Pro</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Generation Examples Section */}
        <section className="bg-card/30 py-24 sm:py-32 border-t border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-center font-headline text-3xl font-bold">Примеры генерации</h2>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {examplePosts.map((post, i) => (
                <div
                  key={i}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                         <Bot className="h-7 w-7 text-primary" />
                         <div>
                            <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{post.platform}</p>
                         </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground/80">{post.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

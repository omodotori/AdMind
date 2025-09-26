import { AdmindHeader } from '../_components/admind-header';
import { Footer } from '../_components/footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const demoSteps = [
    {
        step: 1,
        title: "Заполнение брифа",
        description: "Вы начинаете с заполнения короткой анкеты (брифа). Здесь вы указываете всю важную информацию о вашем продукте, целевой аудитории, маркетинговых целях и желаемом тоне общения. Чем точнее бриф, тем лучше результат."
    },
    {
        step: 2,
        title: "Генерация стратегии",
        description: "На основе вашего брифа, AdMind AI создает комплексную маркетинговую стратегию. Вы получаете анализ целевой аудитории, ключевое сообщение вашего бренда и рекомендации по платформам для продвижения."
    },
    {
        step: 3,
        title: "Создание идей для контента",
        description: "AI предлагает несколько креативных идей для постов, адаптированных под разные форматы (посты для Instagram, идеи для видео и т.д.). Вы можете выбрать понравившийся формат и мгновенно получить готовый текст."
    },
    {
        step: 4,
        title: "Контент-план на неделю",
        description: "В дополнение к идеям, вы получаете структурированный контент-план на 7 дней. Для каждого дня определена тема, формат и готовый текст для публикации. Это экономит ваше время и помогает поддерживать регулярность."
    },
    {
        step: 5,
        title: "Редактирование и экспорт",
        description: "Любой сгенерированный текст можно улучшить или перевести. Когда все готово, вы можете скачать все материалы в одном текстовом файле или поделиться ссылкой на проект с коллегами."
    }
]

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdmindHeader />
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">Как работает AdMind?</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              От идеи до готовой маркетинговой кампании за 5 простых шагов.
            </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
            {demoSteps.map((item) => (
                <Card key={item.step}>
                   <CardHeader className="flex flex-row items-center gap-4">
                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl shadow-lg shadow-primary/20">
                        {item.step}
                     </div>
                     <div>
                        <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                     </div>
                   </CardHeader>
                   <CardContent>
                     <p className="text-base text-muted-foreground">{item.description}</p>
                   </CardContent>
                </Card>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

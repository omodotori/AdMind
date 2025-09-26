import Link from 'next/link';

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 25.6667C20.4434 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55666 20.4434 2.33334 14 2.33334C7.55666 2.33334 2.33333 7.55666 2.33333 14C2.33333 20.4434 7.55666 25.6667 14 25.6667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3333 7C16.3333 7 11.6667 9.33333 11.6667 14C11.6667 18.6667 16.3333 21 16.3333 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 7C11.6667 7 16.3333 9.33333 16.3333 14C16.3333 18.6667 11.6667 21 11.6667 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16.3333C7 16.3333 9.33333 11.6667 14 11.6667C18.6667 11.6667 21 16.3333 21 16.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.6667C7 11.6667 9.33333 16.3333 14 16.3333C18.6667 16.3333 21 11.6667 21 11.6667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-transparent mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">AdMind</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/demo" className="text-sm text-muted-foreground hover:text-foreground">
              Demo
            </Link>
            <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground">
              Legal
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Контакты
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AdMind. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

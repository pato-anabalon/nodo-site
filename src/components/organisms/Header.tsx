import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { navigation } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-nodo-black/72 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between gap-5">
        <Link href="/" aria-label="Nodo home">
          <NodoLogo inverted className="scale-90" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/62 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="/contact" className="hidden sm:inline-flex">
          Start a project
        </Button>
      </Container>
    </header>
  );
}

import { Container } from "@/components/atoms/Container";
import { NodoLogo } from "@/components/atoms/NodoLogo";
import { navigation } from "@/lib/content";

export function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-nodo-black py-12">
      <Container>
        <div className="flex flex-col gap-8 border-t border-white/12 pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <NodoLogo inverted />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/52">
              Digital systems for growing businesses. Built in Auckland, New Zealand.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-white/58 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

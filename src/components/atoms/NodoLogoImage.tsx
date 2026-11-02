import Image from 'next/image';
import { cn } from '@/lib/utils';

type NodoLogoImageProps = {
  className?: string;
  priority?: boolean;
};

export function NodoLogoImage({ className, priority = false }: NodoLogoImageProps) {
  return (
    <Image
      src="/brand/nodo-logo-transparent.png"
      alt="Nodo"
      width={763}
      height={322}
      priority={priority}
      className={cn('h-14 w-auto', className)}
    />
  );
}

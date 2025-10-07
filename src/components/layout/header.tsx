'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/session-analyzer', label: 'Session Analyzer' },
];

export function AppHeader() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-4 text-sm font-medium text-muted-foreground lg:gap-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-colors hover:text-foreground',
            pathname === item.href && 'text-foreground font-semibold'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-headline">LoadPilot</span>
      </Link>
      <div className="hidden md:flex flex-1 items-center gap-4">
        <NavLinks className="ml-6"/>
      </div>
      <div className="md:hidden ml-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-6">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline">LoadPilot</span>
            </Link>
            <NavLinks className="flex-col items-start gap-4 text-base"/>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

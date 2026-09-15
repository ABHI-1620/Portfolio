import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="site-shell flex min-h-[calc(100dvh-76px)] items-center">
      <div className="page-wrap py-24">
        <p className="eyebrow text-[hsl(var(--accent))]">A small wrong turn</p>
        <h1 className="display-font mt-7 max-w-[750px] text-[clamp(5rem,16vw,12rem)] leading-[.78] tracking-[-.08em]">Not<br /><em className="text-[hsl(var(--accent))]">here.</em></h1>
        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold transition-transform hover:-translate-x-1" data-testid="link-not-found-home"><ArrowLeft size={16} /> Return home</Link>
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-not-found-work">Browse selected work <ArrowUpRight size={16} className="link-arrow" /></Link>
        </div>
      </div>
    </main>
  );
}
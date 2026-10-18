"use client";

import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {Menu, X, Globe2, ScanLine} from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const en = locale === 'en-US' || locale === 'en_US';
  const local = (path: string) => en ? `/en_US${path === '/' ? '' : path}` : path;
  const languageHref = en ? pathname.replace(/^\/en_US/, '') || '/' : `/en_US${pathname === '/' ? '' : pathname}`;
  const links = [{href:'/', label:t('Home')}, {href:'/copilot', label:t('Copilot')}, {href:'/changelog', label:t('Changelog')}];
  return <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl">
    <a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-4" href="#main-content">{en ? 'Skip to content' : '跳至主要内容'}</a>
    <nav aria-label={en ? 'Main navigation' : '主导航'} className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-x-4">
      <Link href={local('/')} className="flex min-h-12 items-center gap-2.5 text-sm font-semibold tracking-tight" onClick={()=>setOpen(false)}><ScanLine className="size-5 text-primary" aria-hidden="true" />{en ? 'KeyframeAi' : '剪映一键关键帧'}</Link>
      <div className="hidden items-center gap-7 md:flex">
        {links.map(link=><Link key={link.href} href={local(link.href)} aria-current={pathname===local(link.href)?'page':undefined} className="flex min-h-12 items-center text-sm text-muted-foreground transition-colors hover:text-primary aria-[current=page]:text-foreground">{link.label}</Link>)}
        <Link href={languageHref} className="flex min-h-12 items-center gap-2 text-sm"><Globe2 className="size-4" aria-hidden="true" />{en?'中文':'English'}</Link>
      </div>
      <button className="flex size-11 items-center justify-center rounded-full hover:bg-secondary md:hidden" aria-label={en ? (open?'Close menu':'Open menu') : (open?'关闭菜单':'打开菜单')} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?<X className="size-5"/>:<Menu className="size-5"/>}</button>
      {open && <div id="mobile-navigation" className="w-full border-t pb-5 md:hidden">{links.map(link=><Link key={link.href} href={local(link.href)} className="flex min-h-12 items-center text-sm" onClick={()=>setOpen(false)}>{link.label}</Link>)}<Link href={languageHref} className="flex min-h-12 items-center gap-2 text-sm" onClick={()=>setOpen(false)}><Globe2 className="size-4"/>{en?'中文':'English'}</Link></div>}
    </nav>
  </header>;
}

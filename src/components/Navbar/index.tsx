import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from "@/hooks/useLocale";
import ChangeLanguage from "../ChangeLanguage";
import { headers } from 'next/headers';

const Navbar = () => {
  const t = useTranslations('Home');

  const headersList = headers();
  const locale = headersList.get('x-next-intl-locale') || 'default';
  const { currentLocale, getLocalizedHref } = useLocale(locale);

  const navItems: { href: string; label: string; badge?: string }[] = [
    { href: '/', label: t('Home') },
    { href: '/copilot', label: t('Copilot') },
    { href: '/changelog', label: t('Changelog') },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-sm text-white px-6 py-4 lg:px-10 xl:px-20 flex items-center justify-between border-b border-white/[0.06]">
      {/* Logo */}
      <Link
        href={getLocalizedHref('/')}
        className="whitespace-nowrap hover:opacity-90 transition-opacity"
      >
        <span className="font-display font-bold text-base tracking-tight">剪映一键关键帧</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={getLocalizedHref(item.href)}
            className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            {item.label}
            {item.badge && (
              <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold bg-brand text-black px-1 leading-tight">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        <div className="ml-4 pl-4 border-l border-white/10">
          <ChangeLanguage currentLocale={currentLocale} />
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden relative group">
        <button className="p-2 hover:bg-white/5 transition-colors border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
        <ul className="hidden group-focus-within:block absolute right-0 mt-1 z-50 p-1 bg-[#111111] border border-white/[0.08] w-52">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={getLocalizedHref(item.href)}
                className="relative flex items-center px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 text-[10px] font-bold bg-brand text-black px-1 leading-tight">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="px-4 py-2.5 border-t border-white/[0.06] mt-1">
            <ChangeLanguage currentLocale={currentLocale} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

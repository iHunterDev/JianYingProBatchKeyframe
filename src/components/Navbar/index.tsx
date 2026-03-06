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

  const navItems = [
    { href: '/', label: t('Home') },
    { href: '/copilot', label: t('Copilot') },
    { href: '/leaderboard', label: t('NovelHotList'), badge: 'New' },
    { href: '/changelog', label: t('Changelog') },
  ];

  return (
    <nav className="bg-black text-white px-6 py-4 lg:px-10 xl:px-20 flex items-center justify-between">
      {/* Logo */}
      <Link
        href={getLocalizedHref('/')}
        className="text-xl font-semibold whitespace-nowrap hover:opacity-80 transition-opacity"
      >
        剪映一键关键帧
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={getLocalizedHref(item.href)}
            className="relative px-4 py-2 text-white hover:text-brand transition-colors"
          >
            {item.label}
            {item.badge && (
              <span className="absolute top-0 right-0 text-xs bg-red-600 px-1 rounded-md">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        <div className="ml-4">
          <ChangeLanguage currentLocale={currentLocale} />
        </div>
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden relative group">
        <button className="p-2 rounded-md hover:bg-white/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
        <ul className="hidden group-focus-within:block absolute right-0 mt-1 z-50 p-2 shadow-lg bg-black rounded-lg w-52 border border-white/10">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={getLocalizedHref(item.href)}
                className="relative flex items-center px-4 py-2 text-white hover:text-brand transition-colors rounded-md"
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 text-xs bg-red-600 px-1 rounded-md">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className="px-4 py-2">
            <ChangeLanguage currentLocale={currentLocale} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from "@/hooks/useLocale";
import ChangeLanguage from "../ChangeLanguage";
import { headers } from 'next/headers';

const Navbar =  () => {
  const t = useTranslations('Home');
  
  // 服务端获取当前语言
  const headersList = headers();
  const locale = headersList.get('x-next-intl-locale') || 'default';
  const { currentLocale, getLocalizedHref } = useLocale(locale);

  const navItems = [
    { href: '/', label: t('Home') },
    { 
      href: '/copilot', 
      label: t('Copilot'),
      // badge: 'New'
    },
    {
      href: '/leaderboard',
      label: t('NovelHotList'),
      badge: 'New'
    },
    { href: '/changelog', label: t('Changelog') },
  ];

  return (
    <div className="navbar bg-black text-white px-6 py-4 lg:px-10 xl:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={getLocalizedHref(item.href)}
                  className="text-white hover:text-[#c9fd02] relative !bg-transparent active:!bg-transparent focus:!bg-transparent hover:!bg-transparent"
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute top-0 right-0 text-xs bg-red-600 p-1 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link 
          href={getLocalizedHref('/')} 
          className="btn btn-ghost normal-case text-xl hover:bg-transparent text-white hover:text-white"
        >
          <span className="self-center whitespace-nowrap text-xl font-semibold">剪映一键关键帧</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={getLocalizedHref(item.href)}
                className="text-white hover:text-[#c9fd02] relative px-6 py-4 !bg-transparent active:!bg-transparent focus:!bg-transparent hover:!bg-transparent"
              >
                {item.label}
                {item.badge && (
                  <span className="absolute top-0 right-0 text-xs bg-red-600 p-1 rounded-md">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <ChangeLanguage currentLocale={currentLocale} />

      </div>
      
      <div className="navbar-end flex items-center gap-4">
      </div>
    </div>
  );
};

export default Navbar;
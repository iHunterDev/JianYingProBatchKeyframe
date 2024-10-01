import { ChangeLanguageDropdown, ChangeLanguageDropdownItem } from './ChangeLanguageDropdown';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { locales, localesName, defaultLocale } from "@/i18n/i18n-config";

function ChangeLanguage({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  const getLocalizedHref = (locale: string) => {
    if (locale === defaultLocale) {
      return pathname.replace(`/${currentLocale}`, '') || '/';
    }
    if (currentLocale === defaultLocale) {
      return `/${locale}${pathname}`;
    }
    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  };

  return (
    <ChangeLanguageDropdown label={localesName[currentLocale]}>
      {locales.map((langName: string, index: number) => {
        return (
          <ChangeLanguageDropdownItem key={index}>
            <Link
              className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4"
              href={getLocalizedHref(langName)}
            >
              {localesName[langName]}
            </Link>
          </ChangeLanguageDropdownItem>
        );
      })}
    </ChangeLanguageDropdown>
  );
}

export default ChangeLanguage;

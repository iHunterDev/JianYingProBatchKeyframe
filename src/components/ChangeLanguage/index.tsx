import { ChangeLanguageDropdown, ChangeLanguageDropdownItem } from './ChangeLanguageDropdown';
import Link from "next/link";

function ChangeLanguage({ currentLocale }: any) {
  const { locales, localesName } = require("../../i18n/i18n-config");

  return (
    <ChangeLanguageDropdown label={localesName[currentLocale]}>
      {locales.map((langName: string, index: number) => {
        return (
          <ChangeLanguageDropdownItem key={index}>
            <Link
              className="font-inter rounded-lg hover:text-[#c9fd02] lg:px-6 lg:py-4"
              href={"/" + langName}
            >
              {localesName[langName]}
            </Link>
          </ChangeLanguageDropdownItem>
        );
      })}
    </ChangeLanguageDropdown>
  );
}

export default ChangeLanguage
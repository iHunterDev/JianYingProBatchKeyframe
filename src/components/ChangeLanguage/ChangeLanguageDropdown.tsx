'use client';

import { Dropdown } from 'flowbite-react';
export function ChangeLanguageDropdownItem({ children }: any) {
  return (
    <Dropdown.Item>{children}</Dropdown.Item>
  );
}

export function ChangeLanguageDropdown({children, label} : { children: React.ReactNode, label: string }) {
  return (
    <Dropdown label={label} inline dismissOnClick={false}>
      {children}
    </Dropdown>
  );
}

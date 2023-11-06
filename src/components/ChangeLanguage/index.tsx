'use client';

import { Dropdown } from 'flowbite-react';

function ChangeLanguage({children, label} : { children: React.ReactNode, label: string }) {
  return (
    <Dropdown label={label} inline dismissOnClick={false}>
      {children}
    </Dropdown>
  );
}

export default ChangeLanguage
'use client';

import { Dropdown } from 'flowbite-react';

function ChangeLanguageItem({ children }) {
  return (
    <Dropdown.Item>{ children }</Dropdown.Item>
  );
}

export default ChangeLanguageItem
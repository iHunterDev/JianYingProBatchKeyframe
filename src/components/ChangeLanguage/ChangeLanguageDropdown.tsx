'use client';

export function ChangeLanguageDropdownItem({ children }: any) {
  return (
    <li className="px-2 py-1 hover:bg-white/10 rounded-md">{children}</li>
  );
}

export function ChangeLanguageDropdown({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 py-2 text-white hover:text-brand transition-colors rounded-md hover:bg-white/10">
        {label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <ul className="hidden group-focus-within:block absolute right-0 mt-1 z-50 min-w-[8rem] bg-black border border-white/10 rounded-lg shadow-lg p-1">
        {children}
      </ul>
    </div>
  );
}

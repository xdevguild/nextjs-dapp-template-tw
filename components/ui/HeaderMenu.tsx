import { FC, PropsWithChildren } from 'react';
import { Logo } from './Logo';

export const HeaderMenu: FC<PropsWithChildren> = ({ children }) => {
  return (
    <nav className="flex flex-col text-center items-center justify-between py-9 flex-wrap gap-2 md:flex-row md:text-left">
      <Logo />
      {children}
    </nav>
  );
};

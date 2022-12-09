import { FC } from 'react';
import { SocialMediaIcons } from './SocialMediaIcons';
import { LoginModalButton } from '../tools/LoginModalButton';

interface HeaderMenuButtonsProps {
  enabled: string[];
}

export const HeaderMenuButtons: FC<HeaderMenuButtonsProps> = ({ enabled }) => {
  return (
    <div className="flex gap-5 items-center flex-col sm:flex-row">
      <SocialMediaIcons />
      {enabled.includes('auth') && <LoginModalButton />}
    </div>
  );
};

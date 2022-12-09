import { FC, useCallback, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ActionButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ActionButton: FC<PropsWithChildren<ActionButtonProps>> = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  className,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [disabled, onClick]);

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'border-2 border-color2-darker bg-transparent py-2 px-6 rounded-xl font-normal text-white select-none transition-colors',
        disabled
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:bg-color2-darker transition-colors',
        isFullWidth ? 'w-full' : 'w-auto',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

import { FC, ReactElement, PropsWithChildren } from 'react';
import { useLoggingIn } from '../../hooks/auth/useLoggingIn';
import clsx from 'clsx';

interface AuthenticatedProps {
  fallback?: ReactElement;
  noSpinner?: boolean;
  spinnerCentered?: boolean;
}

export const Authenticated: FC<PropsWithChildren<AuthenticatedProps>> = ({
  children,
  fallback = null,
  noSpinner = false,
  spinnerCentered = false,
}) => {
  const { isLoggingIn, isLoggedIn } = useLoggingIn();

  if (isLoggingIn)
    return noSpinner ? null : (
      <div
        className={clsx(
          'flex',
          spinnerCentered ? 'justify-center' : 'justify-start'
        )}
      >
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-color2-base rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (!isLoggedIn) return fallback;

  return <>{children}</>;
};

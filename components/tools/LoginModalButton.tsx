import { FC, useState } from 'react';
import { ActionButton } from './ActionButton';
import { LoginComponent } from './LoginComponent';
import { useEffectOnlyOnUpdate } from '../../hooks/tools/useEffectOnlyOnUpdate';
import { useLogin } from '../../hooks/auth/useLogin';
import { useLogout } from '../../hooks/auth/useLogout';
import { Dialog } from '@headlessui/react';

export const LoginModalButton: FC = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, isLoggingIn } = useLogin();
  const { logout } = useLogout();

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      setOpen(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <ActionButton onClick={logout}>Disconnect</ActionButton>
      ) : (
        <ActionButton onClick={() => setOpen(true)}>Connect</ActionButton>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-dark-darker p-6 max-w-sm w-full rounded-md">
            <Dialog.Title className="text-center font-bold mb-4">
              Connect your wallet
            </Dialog.Title>
            {isLoggingIn && (
              <div className="flex backdrop-blur-sm bg-black/70 justify-center absolute inset-0">
                <div
                  className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-color2-base rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <LoginComponent />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

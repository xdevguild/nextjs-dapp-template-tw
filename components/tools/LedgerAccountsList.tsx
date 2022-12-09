import { FC, useCallback, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { LoginMethodsEnum } from '../../types/enums';
import { ActionButton } from './ActionButton';
import { shortenHash } from '../../utils/shortenHash';
import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { errorParse } from '../../utils/errorParse';
import clsx from 'clsx';

interface LedgerAccountsListProps {
  getHWAccounts: (page?: number, pageSize?: number) => Promise<string[]>;
  resetLoginMethod: () => void;
  handleLogin: (
    type: LoginMethodsEnum,
    ledgerAccountsIndex?: number
  ) => () => void;
}

const ADDRESSES_PER_PAGE = 10;
const LEDGER_NOT_CONNECTED_CODE = 0x6e01;
const LEDGER_DISCONNECTED = 'DisconnectedDeviceDuringOperation';

export const LedgerAccountsList: FC<LedgerAccountsListProps> = ({
  getHWAccounts,
  resetLoginMethod,
  handleLogin,
}) => {
  const [accounts, setAccounts] = useState<string[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const [listPending, setListPending] = useState(true);
  const [error, setError] = useState<string>();
  const [chosenAddress, setAddress] = useState<string>();

  const { loginToken } = useLoginInfo();

  const mounted = useRef(false);

  const router = useRouter();

  useEffect(() => {
    mounted.current = true;

    const fetch = async () => {
      try {
        mounted.current && setListPending(true);
        const accounts = await getHWAccounts(currentPage, ADDRESSES_PER_PAGE);
        if (accounts?.length > 0 && mounted.current) setAccounts(accounts);
      } catch (e) {
        const err = e as { statusCode: number; name: string };
        if (
          (err.statusCode === LEDGER_NOT_CONNECTED_CODE ||
            err.name === LEDGER_DISCONNECTED) &&
          mounted.current
        ) {
          setError(
            'Not connected, please check the connection and make sure that you have the MultiversX app opened on your Ledger device.'
          );
        } else {
          setError(`Error: ${errorParse(e)}`);
        }
      } finally {
        mounted.current && setListPending(false);
      }
    };
    fetch();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prevState) => prevState + 1);
  }, []);

  const handleRefresh = useCallback(() => {
    router.reload();
  }, [router]);

  const login = useCallback(
    (index: number, address: string) => () => {
      handleLogin(LoginMethodsEnum.ledger, index)();
      setAddress(address);
    },
    [handleLogin]
  );

  useEffect(() => {
    if (!listPending && !accounts && !error) {
      resetLoginMethod();
    }
  }, [accounts, error, listPending, resetLoginMethod]);

  if (listPending) {
    return (
      <div className="flex justify-center align-center mt-6 flex-col">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-color2-base rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div className="mt-3">Loading addresses, please wait...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mx-auto mt-6">
        <p>{error}</p>
        <ActionButton className="mt-4" onClick={handleRefresh}>
          Refresh
        </ActionButton>
      </div>
    );
  }

  if (!accounts) return null;

  if (chosenAddress)
    return (
      <div className="flex justify-center items-center mt-6 flex-col">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-color2-base rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div className="mt-3">Confirm on the Ledger device:</div>
        <div className="mt-3 break-words text-center">
          <div className="font-bold">Address:</div> {chosenAddress}
        </div>
        {loginToken && (
          <div className="mt-3">
            <div className="font-bold">Auth token:</div> {loginToken}
            {'{}'}
          </div>
        )}
      </div>
    );

  return (
    <div className="mx-auto mt-6">
      <p className="font-semibold text-center mb-2">Choose address:</p>
      {accounts?.map((account: string, index: number) => (
        <div
          className="mb-0.5 cursor-pointer border border-transparent rounded-md hover:border-dotted hover:border-white hover:pl-2 transition-all p-1"
          key={account}
          onClick={login(index, account)}
        >
          <span className="inline-block text-center min-w-[4em]">
            {index + currentPage * ADDRESSES_PER_PAGE}
          </span>
          :
          <span className="inline-block ml-4 text-center">
            {shortenHash(account, 11)}
          </span>
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <p
          className={clsx(
            currentPage === 0
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer opacity-100'
          )}
          onClick={handlePrev}
        >
          Prev
        </p>
        <p className="cursor-pointer" onClick={handleNext}>
          Next
        </p>
      </div>
    </div>
  );
};

import { useCallback, useState } from 'react';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';
import { SimpleEGLDTxDemo } from './SimpleEGLDTxDemo';
import { SimpleNftMintDemo } from './SimpleNftMintDemo';
import { SimpleScQeryDemo } from './SimpleScQueryDemo';
import { shortenHash } from '../../utils/shortenHash';
import { networkConfig, chainType } from '../../config/network';
import { ActionButton } from '../tools/ActionButton';
import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { LoginMethodsEnum } from '../../types/enums';

export const SimpleDemo = () => {
  const [result, setResult] = useState<{ type: string; content: string }>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();
  const { loginMethod } = useLoginInfo();

  const handleTxCb = useCallback(
    ({ transaction, pending, error }: TransactionCb) => {
      if (transaction) {
        setResult({ type: 'tx', content: transaction.getHash().hex() });
        setPending(false);
        setError(undefined);
      }
      if (pending) {
        setPending(true);
        setError(undefined);
        setResult(undefined);
      }
      if (error) {
        setError(error);
        setPending(false);
        setResult(undefined);
      }
    },
    []
  );

  const handleQueryCb = useCallback(
    (queryResult: string, pending: boolean, error: string) => {
      if (queryResult) {
        setResult({ type: 'query', content: queryResult });
        setPending(false);
        setError(undefined);
      }
      if (pending) {
        setPending(true);
        setError(undefined);
        setResult(undefined);
      }
      if (error) {
        setError(error);
        setPending(false);
        setResult(undefined);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    setResult(undefined);
    setPending(false);
    setError(undefined);
  }, []);

  return (
    <>
      <div className="relative">
        <div className="flex flex-wrap gap-8 justify-center mb-4">
          <SimpleEGLDTxDemo cb={handleTxCb} />
          <SimpleNftMintDemo cb={handleTxCb} />
          <SimpleScQeryDemo cb={handleQueryCb} />
        </div>
        {error && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center flex-col items-center gap-4">
            <div className="text-xl font-black"> Transaction status:</div>
            <div className="text-lg">{error}</div>

            <div className="text-lg">{error}</div>
            <ActionButton className="mt-4" onClick={handleClose}>
              Close
            </ActionButton>
          </div>
        )}
        {pending && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center flex-col items-center gap-4">
            <div className="text-xl font-black">
              Transaction is pending. Please wait.
            </div>
            {loginMethod === LoginMethodsEnum.walletconnect && (
              <div>
                Confirm it on the Maiar mobile app and wait till it finishes.
              </div>
            )}
            {loginMethod === LoginMethodsEnum.ledger && (
              <div>
                Then wait some time to finish the transaction. You will get the
                transaction hash and link at the end.
              </div>
            )}
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-color2-base rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {result?.type && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center flex-col items-center gap-4">
            {result.type === 'tx' ? (
              <>
                <div className="text-xl font-black">Transaction hash:</div>
                <a
                  className="text-lg underline"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={`${networkConfig[chainType].explorerAddress}/transactions/${result.content}`}
                >
                  {shortenHash(result.content, 10)}
                </a>
              </>
            ) : (
              <>
                <div className="text-xl font-black">Query result</div>
                <div className="text-xl">
                  There is{' '}
                  <div className="font-black text-xl inline-block">
                    {result.content}
                  </div>{' '}
                  NFTs to mint left!
                </div>
              </>
            )}
            <ActionButton className="mt-4" onClick={handleClose}>
              Close
            </ActionButton>
          </div>
        )}
      </div>
    </>
  );
};

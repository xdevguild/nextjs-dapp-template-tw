import { TokenPayment } from '@multiversx/sdk-core';
import { shortenHash } from '../../utils/shortenHash';
import { useAccount } from '../../hooks/auth/useAccount';
import { networkConfig, chainType } from '../../config/network';

export const GetUserDataDemo = () => {
  const { address, nonce, balance } = useAccount();

  return (
    <div className="p-6 rounded-xl bg-dark-darker flex-1">
      <p className="text-xl mb-2 font-black">User data:</p>
      <p>
        <span className="inline-block font-bold">address:</span>{' '}
        <a
          className="underline"
          href={`${networkConfig[chainType].explorerAddress}/accounts/${address}`}
        >
          {shortenHash(address, 8)}
        </a>
      </p>
      <p>
        <span className="inline-block font-bold">nonce:</span> {nonce}
      </p>
      <p>
        <span className="inline-block font-bold">balance:</span>{' '}
        {balance
          ? parseFloat(
              TokenPayment.egldFromBigInteger(balance).toRationalNumber()
            )
          : '-'}
      </p>
    </div>
  );
};

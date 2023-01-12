import { U32Value, ContractFunction } from '@multiversx/sdk-core';
import { useScTransaction } from '../../hooks/core/useScTransaction';
import { useCallback } from 'react';
import { ActionButton } from '../tools/ActionButton';
import { networkConfig, chainType } from '../../config/network';
import { shortenHash } from '../../utils/shortenHash';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const mintSmartContractAddress =
  process.env.NEXT_PUBLIC_MINT_SMART_CONTRACT_ADDRESS || '';
const mintFunctionName = process.env.NEXT_PUBLIC_MINT_FUNCTION_NAME || '';
const mintPaymentPerToken =
  process.env.NEXT_PUBLIC_MINT_PAYMENT_PER_TOKEN || '';

export const SimpleNftMintDemo = ({
  cb,
}: {
  cb: (params: TransactionCb) => void;
}) => {
  const { pending, triggerTx } = useScTransaction({ cb });

  const handleSendTx = useCallback(() => {
    triggerTx({
      smartContractAddress: mintSmartContractAddress,
      func: new ContractFunction(mintFunctionName),
      gasLimit: 14000000,
      args: [new U32Value(1)],
      value: Number(mintPaymentPerToken),
    });
  }, [triggerTx]);

  return (
    <div className="p-6 rounded-xl bg-dark-darker flex-1 flex flex-col text-center items-center justify-center">
      <p className="mb-4">
        2. You will be minting one NFT using{' '}
        <a href="https://www.elven.tools">Elven Tools</a> smart contract: <br />
        <a
          href={`${networkConfig[chainType].explorerAddress}/accounts/${mintSmartContractAddress}`}
          className="font-bold"
        >
          {shortenHash(mintSmartContractAddress, 8)}
        </a>{' '}
        <br />
        (devnet, max 10 NFTs per address)
      </p>
      <ActionButton disabled={pending} onClick={handleSendTx}>
        Mint
      </ActionButton>
    </div>
  );
};

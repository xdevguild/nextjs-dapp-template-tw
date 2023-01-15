import { TransactionPayload } from '@multiversx/sdk-core';
import { useTransaction } from '../../hooks/core/useTransaction';
import { useCallback } from 'react';
import { ActionButton } from '../tools/ActionButton';
import { networkConfig, chainType } from '../../config/network';
import { shortenHash } from '../../utils/shortenHash';
import { TransactionCb } from '../../hooks/core/common-helpers/sendTxOperations';

const egldTransferAddress = process.env.NEXT_PUBLIC_EGLD_TRANSFER_ADDRESS || '';
const egldTransferAmount = process.env.NEXT_PUBLIC_EGLD_TRANSFER_AMOUNT || '';

export const SimpleEGLDTxDemo = ({
  cb,
}: {
  cb: (params: TransactionCb) => void;
}) => {
  const { pending, triggerTx } = useTransaction({ cb });

  const handleSendTx = useCallback(() => {
    const demoMessage = 'Transaction demo!';
    triggerTx({
      address: egldTransferAddress,
      gasLimit: 50000 + 1500 * demoMessage.length,
      data: new TransactionPayload(demoMessage),
      value: Number(egldTransferAmount),
    });
  }, [triggerTx]);

  return (
    <div className="p-6 rounded-xl bg-dark-darker flex-1 flex flex-col text-center items-center justify-center">
      <p className="mb-4">
        1. You will be sending 0.001 EGLD to the address: <br />
        <a
          href={`${networkConfig[chainType].explorerAddress}/accounts/${egldTransferAddress}`}
          className="font-bold"
        >
          {shortenHash(egldTransferAddress, 8)}
        </a>{' '}
        <br />
        (devnet)
      </p>
      <ActionButton disabled={pending} onClick={handleSendTx}>
        Send Transaction
      </ActionButton>
    </div>
  );
};

import { useEffect, useState, FunctionComponent } from 'react';
import { networkConfig, chainType } from '../../config/network';
import { isMobile } from '../../utils/isMobile';
import QRCode from 'qrcode';

interface MobileLoginQRProps {
  walletConnectUri: string;
}

export const MobileLoginQR: FunctionComponent<MobileLoginQRProps> = ({
  walletConnectUri,
}) => {
  const [qrCodeSvg, setQrCodeSvg] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      if (!walletConnectUri) {
        return;
      }

      const svg = await QRCode.toString(walletConnectUri, {
        type: 'svg',
      });

      setQrCodeSvg(svg);
    };
    generateQRCode();
  }, [walletConnectUri]);

  const mobile = isMobile();

  return (
    <div>
      <div
        className="[&>svg]:rounded-xl"
        dangerouslySetInnerHTML={{
          __html: qrCodeSvg,
        }}
      />
      {mobile ? (
        <div className="flex justify-center">
          <a
            className="w-full text-center text-white border-2 border-color2-base rounded-lg py-2 px-6 mt-6 font-normal hover:bg-color2-darker transition-colors"
            href={`${
              networkConfig[chainType]?.walletConnectDeepLink
            }?wallet-connect=${encodeURIComponent(walletConnectUri)}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            Maiar Login
          </a>
        </div>
      ) : null}
    </div>
  );
};

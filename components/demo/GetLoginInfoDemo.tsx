import { useLoginInfo } from '../../hooks/auth/useLoginInfo';
import { shortenHash } from '../../utils/shortenHash';

export const GetLoginInfoDemo = () => {
  const { loginMethod, expires, loginToken, signature } = useLoginInfo();

  return (
    <div className="p-6 rounded-xl bg-dark-darker flex-1">
      <p className="text-xl mb-2 font-black">Login info state:</p>
      <p>
        <span className="inline-block font-bold">loginMethod:</span>{' '}
        {loginMethod}
      </p>
      <p>
        <span className="inline-block font-bold">expires:</span> {expires}
      </p>
      <p>
        <span className="inline-block font-bold">loginToken:</span>{' '}
        {loginToken || '-'}
      </p>
      <p>
        <span className="inline-block font-bold">signature:</span>{' '}
        {signature ? shortenHash(signature, 8) : '-'}
      </p>
    </div>
  );
};

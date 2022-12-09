import { useLoggingIn } from '../../hooks/auth/useLoggingIn';

export const GetLoggingInStateDemo = () => {
  const { isLoggingIn, error, isLoggedIn } = useLoggingIn();

  return (
    <div className="p-6 rounded-xl bg-dark-darker flex-1">
      <p className="text-xl mb-2 font-black">Logging in current state:</p>
      <p>
        <span className="inline-block font-bold">isLoggingIn:</span>{' '}
        {isLoggingIn ? 'true' : 'false'}
      </p>
      <p>
        <span className="inline-block font-bold">error:</span> {error || '-'}
      </p>
      <p>
        <span className="inline-block font-bold">isLoggedIn:</span>{' '}
        {isLoggedIn ? 'true' : 'false'}
      </p>
    </div>
  );
};

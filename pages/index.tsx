import type { NextPage } from 'next';
import { MainLayout } from '../components/ui/MainLayout';
import { HeaderMenu } from '../components/ui/HeaderMenu';
import { HeaderMenuButtons } from '../components/ui/HeaderMenuButtons';
import { SimpleDemo } from '../components/demo/SimpleDemo';
import { GetUserDataDemo } from '../components/demo/GetUserDataDemo';
import { GetLoggingInStateDemo } from '../components/demo/GetLoggingInStateDemo';
import { GetLoginInfoDemo } from '../components/demo/GetLoginInfoDemo';
import { Authenticated } from '../components/tools/Authenticated';
import { LoginModalButton } from '../components/tools/LoginModalButton';

const Home: NextPage = () => {
  return (
    <MainLayout>
      <HeaderMenu>
        <HeaderMenuButtons enabled={['auth']} />
      </HeaderMenu>
      <div className="mb-4 p-6 rounded-xl bg-dark-darker">
        <p className="mb-4">
          Here is the demo of an MultiversX dapp for interactions with the
          blockchain and smart contracts. It provides four different ways of
          authentication and also a couple of React-based helpers/hooks. It is
          based on NextJS and uses erdjs SDK. It also uses Chakra UI. Heavily
          based on the{' '}
          <a
            className="underline"
            href="https://www.elven.tools/docs/minter-dapp-introduction.html"
          >
            Elven Tools Dapp
          </a>
        </p>
        <p className="mb-4">
          We have hardcoded a setup for three different operations to simplify
          things. These are:
        </p>
        <ol className="mb-4 list-decimal pl-4">
          <li>Simple EGLD transfer to hardcoded address.</li>
          <li>
            Simple Mint operation on Elven Tools demo minter smart contract.
          </li>
          <li>
            Random query operation on the Elven Tools demo minter smart
            contract.
          </li>
        </ol>
        <p>
          It is to demonstrate how such things can be achieved without much
          development. Maybe later, we will come up with a much better demo
          dapp.
        </p>
      </div>
      <Authenticated
        spinnerCentered
        fallback={
          <>
            <h2 className="font-bold text-2xl text-center">
              Connect your wallet!
            </h2>
            <div className="flex justify-center mt-4">
              <LoginModalButton />
            </div>
          </>
        }
      >
        <SimpleDemo />
        <div className="mb-4 p-6 rounded-xl bg-dark-darker">
          <p className="mb-4">
            Now let us see what other valuable tools are included.
          </p>
          <p className="mb-4">
            You can get the data of currently logged-in users and network state.
            These are:
          </p>
          <ol className="mb-4 list-decimal pl-4">
            <li>User data such as: address, nonce, balance.</li>
            <li>User logging in state: pending, error, loggedIn.</li>
            <li>
              Login info state: loginMethod, expires, loginToken, signature.
            </li>
          </ol>
        </div>
        <div className="flex gap-8 flex-wrap justify-center mb-4">
          <GetUserDataDemo />
          <GetLoginInfoDemo />
          <GetLoggingInStateDemo />
        </div>
        <div className="mb-4 p-6 rounded-xl bg-dark-darker">
          <p>You will also get a couple of other tools, like:</p>
          <ul className="list-disc pl-4">
            <li>Authenticated component - wrapper to check the auth state</li>
            <li>ActionButton component - styled action button</li>
            <li>LoginComponent - component with 3 auth options</li>
            <li>
              LoginModalButton component - ready to use modal with
              LoginComponent
            </li>
            <li>
              Besides the mentioned already hooks, you will get all the auth
              hooks that are building blocks for the LoginComponents to build
              the structures that suit you best.
            </li>
            <li>
              The API access can be configured, masked, and limited only to the
              dapp.
            </li>
            <li>And of course Chakra UI and NextJS framework</li>
          </ul>
        </div>
        <div className=" p-6 rounded-xl bg-dark-darker">
          <p>Documentation, roadmap, and more improvements soon!</p>
          <p>
            Check the{' '}
            <a href="https://github.com/xdevguild" className="underline">
              xDevGuild
            </a>
          </p>
        </div>
      </Authenticated>
    </MainLayout>
  );
};

export default Home;

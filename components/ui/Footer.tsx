import packageJson from '../../package.json';

export const Footer = () => {
  return (
    <footer className="h-[120px] bg-dark-darker text-white flex items-center">
      <div className="max-w-7xl mx-auto text-sm text-center">
        <div>MultiversX NextJS Dapp Template (v{`${packageJson.version}`})</div>
        <div className="text-xs font-extralight">
          All for free. Please support the project. Give it credit and tell the
          world about it. Attribution is not required but welcomed in the form
          of a backlink.
        </div>
        <div className="flex text-xs justify-center font-bold">
          <a
            className="text-color3-base"
            href="https://github.com/xdevguild"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            xDevGuild
          </a>
          <span className="mx-2"> | </span>
          <a
            className="text-color3-base"
            href="https://www.julian.io"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            julian.io
          </a>
        </div>
      </div>
    </footer>
  );
};

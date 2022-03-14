import footer from "./footer.module.scss";

interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  return (
    <footer className={`${footer.container} ${className}`}>
      <ul>
        <li>&copy; {new Date().getFullYear()}</li>
        {"|"}
        <li>Termos</li>
        {"|"}
        <li>
          <a
            href="https://github.com/joaovitorzv"
            target="_blank"
            rel="noreferrer"
          >
            @joaovitorzv
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

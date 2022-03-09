import footer from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={footer.container}>
      <ul>
        <li>&copy; {new Date().getFullYear()}</li>
        {" | "}
        <li>Termos</li>
        {" | "}
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

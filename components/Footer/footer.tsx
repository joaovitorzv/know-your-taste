import footer from "./footer.module.scss";
import Modal from "../Modal/modal";
import { useState } from "react";

interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  const [termsModal, setTermsModal] = useState(false);

  return (
    <footer className={`${footer.container} ${className}`}>
      <ul>
        <li>&copy; {new Date().getFullYear()}</li>
        {"|"}
        <li
          onClick={() => setTermsModal(true)}
          role="button"
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Politícas de Privacidade
        </li>
        <Modal
          headerText="Politícas de Privacidade"
          isOpen={termsModal}
          toggle={() => setTermsModal(false)}
        >
          <section className={footer.terms}>
            <h5>Práticas de privacidade aplicadas ao site</h5>
            <p>
              A coleta e uso de dados estãos sujeitas as seguintes políticas de
              privacidade:
            </p>
            <p>Não armazenamos nenhuma informação do usúario;</p>
            <p>Todas informações que coletamos são mostradas ao usuário;</p>
            <p>
              Em caso de duvidas sobre seus dados contate o email{" "}
              <strong>joaovitorzv@outlook.com</strong>
              {";"}
            </p>
            <p>
              Todos os cookies são utilizados apenas para armazenar tokens de
              autenticação do usuário;
            </p>
            <p>
              Não permitimos cookies de terceiros para coletar suas atividades
              de navegação;
            </p>
          </section>
        </Modal>
        {"|"}
        <li>
          <a
            href="https://github.com/joaovitorzv"
            target="_blank"
            rel="noreferrer"
          >
            Crafted by @joaovitorzv
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

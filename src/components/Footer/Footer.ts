import './Footer.css';

interface FooterProps {
    desenvolvedor: string;
}

function Footer({desenvolvedor}: FooterProps) {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('container');
    paragrafo.textContent = `© ${new Date().getFullYear()} Amigo Secreto - Desenvolvido por ${desenvolvedor}`;

    footer.appendChild(paragrafo);

    return footer;
}

export default Footer;
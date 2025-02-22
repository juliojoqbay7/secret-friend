// src/components/Header/Header.ts

import './Header.css';
import Link from '../Link/Link';

interface HeaderProps {
    title: string;
    onNavigate: (page: string) => void;
}

function Header({title, onNavigate}: HeaderProps) {
    const header = document.createElement('header');
    header.classList.add('header');

    const nav = document.createElement('nav');
    nav.classList.add('main-nav', 'container');
    header.appendChild(nav);

    const h1 = document.createElement('h1');
    h1.textContent = title;
    nav.appendChild(h1);

    const botaoMenu = document.createElement('button');
    botaoMenu.classList.add('menu-toggle');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
    botaoMenu.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;

    nav.appendChild(botaoMenu);

    const menu = document.createElement('ul');
    menu.classList.add('menu');
    
    // Cria os itens do menu usando o componente Link
    const linkHome = Link({ page: 'home', children: 'Home', onNavigate });
    const linkSobre = Link({ page: 'about', children: 'Sobre', onNavigate });

    // Criando as li's
    const liHome = document.createElement('li');
    const liSobre = document.createElement('li');

    // Adicionando os links como filhos das li's
    liHome.appendChild(linkHome);
    liSobre.appendChild(linkSobre);

    // Adicionando as li's ao menu
    menu.appendChild(liHome);
    menu.appendChild(liSobre);

    nav.appendChild(menu);

    botaoMenu.addEventListener('click', () => {
        menu.classList.toggle('active');
        botaoMenu.classList.toggle('active');
    })

    return header;

}

export default Header;
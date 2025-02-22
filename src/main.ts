// src/main.ts

import Page from './components/Page/Page';
import Main from './components/Main/Main';
import About from './components/pages/About';
import './styles/style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

// Função para renderizar a página correta
function renderPage(page: string) {
  app.innerHTML = '';

  let content: HTMLElement;
  
  if (page === 'home') {
    content = Main();
  } else if (page === 'about') {
    content = About();
  } else {
    // Página de erro 404 
    content = document.createElement('div');
    content.classList.add('error-page');
    const h1 = document.createElement('h1');
    h1.textContent = 'Página não encontrada';
    content.appendChild(h1);
  }

  app.appendChild(Page({ title: page === 'home' ? 'Amigo Secreto' : 'Sobre', onNavigate: renderPage, children: content }));
}

// Renderiza a página inicial
renderPage('home');
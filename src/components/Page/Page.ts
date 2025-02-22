// src/components/Page/Page.ts

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Page.css';

interface PageProps {
  title: string;
  children: HTMLElement; // children é um HTMLElement (o resultado de Main ou About)
  onNavigate: (page: string) => void;
}

function Page({ title, children, onNavigate }: PageProps) {
  const page = document.createElement('div');
  page.classList.add('page');

  // Cria um container para o conteúdo principal
  const pageContent = document.createElement('div');
  pageContent.classList.add('page-content');
  pageContent.appendChild(children); // Adiciona o children (conteúdo da página)

  // Adiciona os elementos à página principal
  page.appendChild(Header({ title, onNavigate}));
  page.appendChild(pageContent);
  page.appendChild(Footer({ desenvolvedor: 'JULIO JOQBAY' }));

  return page;
}

export default Page;
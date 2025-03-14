// src/pages/About/About.ts

import './About.css';
import collaboration from "/online-collaboration.svg";

function About() {
  const aboutPage = document.createElement('div');
  aboutPage.classList.add('about-page');

  aboutPage.innerHTML = `
    <div class="container about-container">

        <div class="about-image">
            <img src="${collaboration}" alt="Ilustração Sobre" class="illustration">
        </div>
        <div class="about-content">
            <h1>Sobre o Amigo Secreto</h1>
            <p>
                Este projeto foi desenvolvido como parte de um curso de programação web da Alura, em parceira com o programa ONE (Oracle Next Education), com o objetivo de praticar os fundamentos de HTML, CSS, e JavaScript. Eu optei por utilizar o Vite como ferramenta de build e o TypeScript para maior segurança do código.
            </p>
            <p>
                O Amigo Secreto (ou Amigo Oculto) é uma brincadeira tradicional em que um grupo de pessoas troca presentes de forma anônima. Cada participante sorteia o nome de outra pessoa para presentear, e o segredo só é revelado no dia da troca.
            </p>
            <p>
               Este aplicativo web simplifica o processo de sorteio, permitindo que os participantes adicionem seus nomes, realizem o sorteio de forma aleatória e, em seguida, revelem seus amigos secretos de maneira privada.
            </p>
            <h2>Tecnologias Utilizadas</h2>
            <div class="tech-icons">
                <i class="devicon-html5-plain" title="HTML5"></i>
                <i class="devicon-css3-plain" title="CSS3"></i>
                <i class="devicon-javascript-plain" title="JavaScript"></i>
                <i class="devicon-typescript-plain" title="TypeScript"></i>
                <i class="devicon-vite-plain" title="Vite"></i>
                <i class="devicon-git-plain" title="Git"></i>
                <i class="devicon-github-original" title="GitHub"></i>
            </div>
            <h2>Código Fonte</h2>
            <p>
                O código fonte completo deste projeto está disponível no GitHub. Você pode clonar o repositório, explorar o código, fazer modificações e até mesmo contribuir com melhorias!
            </p>
            <a href="https://github.com/juliojoqbay7/secret-friend" class="github-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github"></i> Ver Código
            </a>
        </div>


    </div>
  `;

  return aboutPage;
}

export default About;
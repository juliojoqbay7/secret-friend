(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();function C({page:e,children:i,onNavigate:r}){const o=document.createElement("a");return o.href="#",o.innerHTML=i,o.addEventListener("click",n=>{n.preventDefault(),r(e)}),o}function N({title:e,onNavigate:i}){const r=document.createElement("header");r.classList.add("header");const o=document.createElement("nav");o.classList.add("main-nav","container"),r.appendChild(o);const n=document.createElement("h1");n.textContent=e,o.appendChild(n);const a=document.createElement("button");a.classList.add("menu-toggle"),a.setAttribute("aria-label","Abrir menu"),a.innerHTML=`
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `,o.appendChild(a);const c=document.createElement("ul");c.classList.add("menu");const m=C({page:"home",children:"Home",onNavigate:i}),v=C({page:"about",children:"Sobre",onNavigate:i}),l=document.createElement("li"),g=document.createElement("li");return l.appendChild(m),g.appendChild(v),c.appendChild(l),c.appendChild(g),o.appendChild(c),a.addEventListener("click",()=>{c.classList.toggle("active"),a.classList.toggle("active")}),r}function $({desenvolvedor:e}){const i=document.createElement("footer");i.classList.add("footer");const r=document.createElement("p");return r.classList.add("container"),r.textContent=`© ${new Date().getFullYear()} Amigo Secreto - Desenvolvido por ${e}`,i.appendChild(r),i}function j({title:e,children:i,onNavigate:r}){const o=document.createElement("div");o.classList.add("page");const n=document.createElement("div");return n.classList.add("page-content"),n.appendChild(i),o.appendChild(N({title:e,onNavigate:r})),o.appendChild(n),o.appendChild($({desenvolvedor:"JULIO JOQBAY"})),o}const F="/secret-friend/online-collaboration.svg",I="/secret-friend/dev.svg";function B(){const e=document.createElement("main");e.classList.add("main"),e.innerHTML=`
    <div class="main-container container">
    <div class="illustration-left">
      <img src=${F} alt="Ilustração 1"  class="illustration">
    </div>
    <div class="content">
      <section id="add-participant-container">
        <h2>Adicionar Participante</h2>
        <label for="participant-name">Nome:</label>
        <input type="text" id="participant-name" />
        <button id="add-button">Adicionar</button>
        <p id="add-message"></p>
      </section>
      <section id="participant-list-container"></section>
      <section id="draw-result-container">
        <h2>Sortear Amigo Secreto</h2>
        <button id="draw-button" disabled>Sortear Amigo</button>
        <p id="draw-message"></p>
        <div id="reveal-container">
          <label for="reveal-name">Digite seu nome:</label>
          <input type="text" id="reveal-name" />
          <button id="reveal-button" disabled>Revelar Meu Amigo Secreto</button>
        </div>
        <p id="draw-result"></p>
        <button id="reset-button">Resetar Aplicação</button>
      </section>
      </div>
    <div class="illustration-right">
       <img src=${I} alt="Ilustração 2" class="illustration">
    </div>
  </div>
  `;const i=e.querySelector("#add-button"),r=e.querySelector("#participant-name"),o=e.querySelector("#participant-list-container"),n=e.querySelector("#draw-button"),a=e.querySelector("#draw-result"),c=e.querySelector("#draw-message"),m=e.querySelector("#reveal-name"),v=e.querySelector("#reveal-button"),l=e.querySelector("#add-message"),g=e.querySelector("#reset-button"),S=e.querySelector("#reveal-container");let u=[],b=[];o.innerHTML="Nenhum participante adicionado ainda.";function h(t,s,d="success"){t.textContent=s,t.classList.remove("success","error"),t.classList.add(d),setTimeout(()=>{t.classList.remove("success","error"),t.textContent=""},3e3)}function x(){a.textContent="",a.style.backgroundColor="transparent"}function f(){n.disabled=u.length<2,v.disabled=b.length===0||m.value.trim()===""}function M(){u=[],b=[],r.value="",m.value="",a.textContent="",l.textContent="",L(),n.disabled=!0,v.disabled=!0,S.style.display="none",c.textContent=""}i.addEventListener("click",P),n.addEventListener("click",A),v.addEventListener("click",T),g.addEventListener("click",M),m.addEventListener("input",f);function P(){const t=r.value.trim();if(t===""){h(l,"Por favor, digite um nome válido.","error");return}if(u.includes(t)){h(l,"Este nome já foi adicionado. Por favor, digite um nome diferente.","error");return}u.push(t),r.value="",h(l,"Participante adicionado com sucesso!","success"),x(),L(),f()}function L(){if(o.innerHTML="",u.length===0){o.innerHTML="<p>Nenhum participante adicionado ainda.</p>";return}const t=document.createElement("ul");u.forEach((s,d)=>{const p=document.createElement("li");p.innerHTML=`
                ${s}
                <button class="remove-button" data-index="${d}">
                    <i class="fa-solid fa-trash"></i> 
                </button>
            `,t.appendChild(p)}),o.appendChild(t),o.querySelectorAll(".remove-button").forEach(s=>{s.addEventListener("click",q)})}function q(t){const s=t.currentTarget,d=parseInt(s.dataset.index);u.splice(d,1),L(),f(),h(l,"Participante removido com sucesso!","success")}function A(){c.textContent="Sorteando amigo secreto...";const t=[...u];for(let s=t.length-1;s>0;s--){const d=Math.floor(Math.random()*(s+1));[t[s],t[d]]=[t[d],t[s]]}b=H(t),setTimeout(()=>{c.textContent="Sorteio realizado com sucesso!",c.classList.add("success")},3e3),a.textContent="",n.disabled=!1,v.disabled=!1,S.style.display="flex"}function H(t){const s=[],d=t.length;for(let p=0;p<d;p++){const w=t[p],O=(p+1)%d,k=t[O];s.push([w,k])}return s}function T(){const t=m.value.trim();if(t===""){alert("Por favor, digite seu nome para revelar seu amigo secreto.");return}const s=b.find(([d,p])=>d===t);s?a.textContent=`O amigo secreto de ${t} é ${s[1]}!`:a.textContent=`Participante "${t}" não encontrado. Verifique se digitou o nome corretamente.`,m.value="",f()}return f(),e}function z(){const e=document.createElement("div");return e.classList.add("about-page"),e.innerHTML=`
    <div class="container">  
        <section class="about-content">
        <h1>Sobre o Amigo Secreto</h1>
            <p>
                Este projeto foi desenvolvido como parte de um curso de programação web, com o objetivo de praticar os fundamentos de HTML, CSS, e JavaScript/TypeScript, utilizando o Vite como ferramenta de build.
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
                <i class="devicon-github-original" title="GitHub"></i>
            </div>
            <h2>Código Fonte</h2>
            <p>
                O código fonte completo deste projeto está disponível no GitHub. Você pode clonar o repositório, explorar o código, fazer modificações e até mesmo contribuir com melhorias!
            </p>
            <a href="https://github.com/juliojoqbay7/secret-friend" class="github-link" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-github"></i> Ver no GitHub
            </a>
        </section>
    </div>
  `,e}const y=document.querySelector("#app");function E(e){y.innerHTML="";let i;if(e==="home")i=B();else if(e==="about")i=z();else{i=document.createElement("div"),i.classList.add("error-page");const r=document.createElement("h1");r.textContent="Página não encontrada",i.appendChild(r)}y.appendChild(j({title:e==="home"?"Amigo Secreto":"Sobre",onNavigate:E,children:i}))}E("home");

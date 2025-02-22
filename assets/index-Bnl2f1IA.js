(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();function C({page:e,children:o,onNavigate:r}){const i=document.createElement("a");return i.href="#",i.innerHTML=o,i.addEventListener("click",n=>{n.preventDefault(),r(e)}),i}function j({title:e,onNavigate:o}){const r=document.createElement("header");r.classList.add("header");const i=document.createElement("nav");i.classList.add("main-nav","container"),r.appendChild(i);const n=document.createElement("h1");n.textContent=e,i.appendChild(n);const a=document.createElement("button");a.classList.add("menu-toggle"),a.setAttribute("aria-label","Abrir menu"),a.innerHTML=`
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `,i.appendChild(a);const s=document.createElement("ul");s.classList.add("menu");const f=C({page:"home",children:"Home",onNavigate:o}),L=C({page:"about",children:"Sobre",onNavigate:o}),m=document.createElement("li"),S=document.createElement("li");return m.appendChild(f),S.appendChild(L),s.appendChild(m),s.appendChild(S),i.appendChild(s),a.addEventListener("click",()=>{s.classList.toggle("active"),a.classList.toggle("active")}),r}function k({desenvolvedor:e}){const o=document.createElement("footer");o.classList.add("footer");const r=document.createElement("p");return r.classList.add("container"),r.textContent=`© ${new Date().getFullYear()} Amigo Secreto - Desenvolvido por ${e}`,o.appendChild(r),o}function F({title:e,children:o,onNavigate:r}){const i=document.createElement("div");i.classList.add("page");const n=document.createElement("div");return n.classList.add("page-content"),n.appendChild(o),i.appendChild(j({title:e,onNavigate:r})),i.appendChild(n),i.appendChild(k({desenvolvedor:"JULIO JOQBAY"})),i}const N="/secret-friend/dev.svg";function $(){const e=document.createElement("main");e.classList.add("main"),e.innerHTML=`
     <div class="main-container container">
        <div class="content">  <section id="add-participant-container">
                <h2>Adicionar Participante</h2>
                <label for="participant-name">Nome:</label>
                <input type="text" id="participant-name" />
                <button id="add-button">Adicionar</button>
                <p id="add-message"></p>
            </section>
            <section id="participant-list-container"></section>
            <section id="draw-result-container">
                <h2>Sortear Amigo Secreto</h2>
                <button id="draw-button">Sortear Amigo</button>
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
            <img src=${N} alt="Ilustração" class="illustration">
        </div>
    </div>
    `;const o=e.querySelector("#add-button"),r=e.querySelector("#participant-name"),i=e.querySelector("#participant-list-container"),n=e.querySelector("#draw-button"),a=e.querySelector("#draw-result"),s=e.querySelector("#draw-message"),f=e.querySelector("#reveal-name"),L=e.querySelector("#reveal-button"),m=e.querySelector("#add-message"),S=e.querySelector("#reset-button"),P=e.querySelector("#reveal-container");let l=[],b=[],h=!1;function u(t,c,d="success"){t.textContent=c,t.classList.remove("success","error"),t.classList.add(d),setTimeout(()=>{t.classList.remove("success","error"),t.textContent=""},3e3)}function v(){o.disabled=!1,n.disabled=l.length<2||h,L.disabled=b.length===0||f.value.trim()===""||h,P.style.display=b.length>0&&!h?"flex":"none",A()}function x(){l=[],b=[],h=!1,r.value="",f.value="",a.textContent="",m.textContent="",s.textContent="",v()}o.addEventListener("click",M),n.addEventListener("click",w),L.addEventListener("click",T),S.addEventListener("click",x),f.addEventListener("input",v);function M(){const t=r.value.trim();if(t===""){u(m,"Por favor, digite um nome válido.","error");return}if(l.includes(t)){u(m,"Este nome já foi adicionado. Por favor, digite um nome diferente.","error");return}l.push(t),r.value="",u(m,"Participante adicionado com sucesso!","success"),v()}function A(){if(i.innerHTML="",l.length===0){i.innerHTML="<p>Nenhum participante adicionado ainda.</p>";return}const t=document.createElement("ul");l.forEach((c,d)=>{const p=document.createElement("li"),g=document.createElement("button");g.classList.add("remove-button"),g.innerHTML='<i class="fa-solid fa-trash"></i>',g.dataset.index=d.toString(),g.addEventListener("click",q),p.textContent=c,p.appendChild(g),t.appendChild(p)}),i.appendChild(t)}function q(t){const c=t.currentTarget,d=parseInt(c.dataset.index);l.splice(d,1),v(),u(m,"Participante removido com sucesso!","success")}function w(){if(l.length<2){u(s,"Adicione pelo menos dois participantes para realizar o sorteio.","error");return}h=!0,v(),s.textContent="Sorteando...",setTimeout(()=>{const t=[...l];for(let c=t.length-1;c>0;c--){const d=Math.floor(Math.random()*(c+1));[t[c],t[d]]=[t[d],t[c]]}b=H(t),h=!1,v(),u(s,"Sorteio realizado com sucesso!","success")},1e3)}function H(t){const c=[],d=t.length;for(let p=0;p<d;p++){const g=t[p],O=(p+1)%d,I=t[O];c.push([g,I])}return c}function T(){const t=f.value.trim();if(t===""){u(s,"Por favor, digite seu nome para revelar seu amigo secreto.","error");return}const c=b.find(([d,p])=>d===t);c?(a.textContent=`O amigo secreto de ${t} é ${c[1]}!`,u(s,"","success")):u(s,`Participante "${t}" não encontrado. Verifique se digitou o nome corretamente.`,"error"),f.value="",v()}return v(),e}const z="/secret-friend/online-collaboration.svg";function B(){const e=document.createElement("div");return e.classList.add("about-page"),e.innerHTML=`
    <div class="container about-container">

        <div class="about-image">
            <img src="${z}" alt="Ilustração Sobre" class="illustration">
        </div>
        <div class="about-content">
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
                <i class="fa-brands fa-github"></i> Ver Código
            </a>
        </div>


    </div>
  `,e}const E=document.querySelector("#app");function y(e){E.innerHTML="";let o;if(e==="home")o=$();else if(e==="about")o=B();else{o=document.createElement("div"),o.classList.add("error-page");const r=document.createElement("h1");r.textContent="Página não encontrada",o.appendChild(r)}E.appendChild(F({title:e==="home"?"Amigo Secreto":"Sobre",onNavigate:y,children:o}))}y("home");

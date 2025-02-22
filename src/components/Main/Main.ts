import './Main.css';

import collaboration from '/online-collaboration.svg';
import dev from '/dev.svg';

function Main() {
  const main = document.createElement('main');
  main.classList.add('main');

  main.innerHTML = `
    <div class="main-container container">
    <div class="illustration-left">
      <img src=${collaboration} alt="Ilustração 1"  class="illustration">
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
       <img src=${dev} alt="Ilustração 2" class="illustration">
    </div>
  </div>
  `;

  // --- Elementos do DOM ---
  const addButton = main.querySelector('#add-button') as HTMLButtonElement;
  const participantNameInput = main.querySelector('#participant-name') as HTMLInputElement;
  const participantListContainer = main.querySelector('#participant-list-container')!;
  const drawButton = main.querySelector('#draw-button') as HTMLButtonElement;
  const drawResult = main.querySelector('#draw-result') as HTMLParagraphElement;
  const drawMessage = main.querySelector('#draw-message') as HTMLParagraphElement;
  const revealNameInput = main.querySelector('#reveal-name') as HTMLInputElement;
  const revealButton = main.querySelector('#reveal-button') as HTMLButtonElement;
  const addMessage = main.querySelector('#add-message') as HTMLParagraphElement; // Elemento para mensagens
  const resetButton = main.querySelector('#reset-button') as HTMLButtonElement;
  const revealContainer = main.querySelector('#reveal-container') as HTMLDivElement;

  // --- Variáveis de Estado ---
  let participants: string[] = [];
  let pairs: [string, string][] = [];

  participantListContainer.innerHTML = 'Nenhum participante adicionado ainda.';
  // --- Funções Auxiliares ---

  function showMessage(element: HTMLElement, message: string, type: 'success' | 'error' = 'success') {
    element.textContent = message;
    element.classList.remove('success', 'error'); // Remove classes anteriores
    element.classList.add(type); // Adiciona a classe correta
    //Remove a class após um tempo.
    setTimeout(() => {
      element.classList.remove('success', 'error');
      element.textContent = '';
    }, 3000)
  }

  function clearDrawResult() {
    drawResult.textContent = '';
    drawResult.style.backgroundColor = 'transparent';
  }
    // Função para habilitar/desabilitar botões
    function updateButtonStates() {
        drawButton.disabled = participants.length < 2;
        revealButton.disabled = pairs.length === 0 || revealNameInput.value.trim() === '';
    }
    function resetApp() {
        // Limpa o array de participantes
        participants = [];

        // Limpa os pares
        pairs = [];

        // Limpa os campos de entrada
        participantNameInput.value = '';
        revealNameInput.value = '';

        // Limpa as mensagens
        drawResult.textContent = '';
        addMessage.textContent = '';

        // Renderiza a lista de participantes (vazia)
        renderParticipantList();

        // Desabilita os botões de sorteio
        drawButton.disabled = true;
        revealButton.disabled = true;
        //Oculta a área para digitar o nome.
        revealContainer.style.display = 'none'
        drawMessage.textContent = '';
    }

  // --- Event Listeners ---

  addButton.addEventListener('click', addParticipant);
  drawButton.addEventListener('click', drawSecretFriend);
  revealButton.addEventListener('click', revealSecretFriend);
  resetButton.addEventListener('click', resetApp);
  // Adiciona um event listener para o input de revelação (para habilitar/desabilitar o botão)
    revealNameInput.addEventListener('input', updateButtonStates);

  // --- Funções Principais ---

  function addParticipant() {
    const name = participantNameInput.value.trim();

    if (name === '') {
      showMessage(addMessage, 'Por favor, digite um nome válido.', 'error');
      return;
    }
    //Verifica nomes duplicados
    if (participants.includes(name)) {
            showMessage(addMessage, 'Este nome já foi adicionado. Por favor, digite um nome diferente.', 'error');
            return;
        }

    participants.push(name);
    participantNameInput.value = '';
    showMessage(addMessage, 'Participante adicionado com sucesso!', 'success');
    clearDrawResult(); // Limpa o resultado do sorteio
    renderParticipantList();
    updateButtonStates(); // Atualiza o estado dos botões

  }

  function renderParticipantList() {
    participantListContainer.innerHTML = '';
    if (participants.length === 0) {
      participantListContainer.innerHTML = '<p>Nenhum participante adicionado ainda.</p>';
      return;
    }
    const ul = document.createElement('ul');
    participants.forEach((participant, index) => { // Adiciona o índice
      const li = document.createElement('li');
       // Adiciona um botão de remover
      li.innerHTML = `
                ${participant}
                <button class="remove-button" data-index="${index}">
                    <i class="fa-solid fa-trash"></i> 
                </button>
            `;
      ul.appendChild(li);
    });
    participantListContainer.appendChild(ul);
     // Adiciona event listeners aos botões de remover
     participantListContainer.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', removeParticipant);
        });
  }
    function removeParticipant(event: Event) {
        const target = event.currentTarget as HTMLButtonElement;
        const indexToRemove = parseInt(target.dataset.index!);
        participants.splice(indexToRemove, 1);
        renderParticipantList();
        updateButtonStates()
        showMessage(addMessage, 'Participante removido com sucesso!', 'success');
    }

  function drawSecretFriend() {
    drawMessage.textContent = 'Sorteando amigo secreto...';
     // Embaralha o array de participantes (Algoritmo de Fisher-Yates)
    //Criei uma cópia para não alterar o array original.
    const shuffledParticipants = [...participants];
    for (let i = shuffledParticipants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
    }

    pairs = createPairs(shuffledParticipants);

    setTimeout(() => {
      drawMessage.textContent = 'Sorteio realizado com sucesso!';
      drawMessage.classList.add('success');
    }, 3000)

    // Limpa o resultado anterior
    drawResult.textContent = '';
    // Desabilita o botão de sorteio após o sorteio
    drawButton.disabled = false;
    //Habilita o botão de revelação
    revealButton.disabled = false;
     //Mostra a área para digitar o nome.
    revealContainer.style.display = 'flex'
    
  
  }

    function createPairs(shuffledParticipants: string[]): [string, string][] {
      const pairs: [string, string][] = [];
      const numParticipants = shuffledParticipants.length;

      for (let i = 0; i < numParticipants; i++) {
        const participant = shuffledParticipants[i];
        const secretFriendIndex = (i + 1) % numParticipants;
        const secretFriend = shuffledParticipants[secretFriendIndex];
        pairs.push([participant, secretFriend]);
      }
      return pairs;
    }

  function revealSecretFriend() {
     const revealName = revealNameInput.value.trim();
        if (revealName === '') {
            alert('Por favor, digite seu nome para revelar seu amigo secreto.');
            return;
        }
        const foundPair = pairs.find(([participant, _]) => participant === revealName);
        if (foundPair) {
            drawResult.textContent = `O amigo secreto de ${revealName} é ${foundPair[1]}!`;
        } else {
            drawResult.textContent = `Participante "${revealName}" não encontrado. Verifique se digitou o nome corretamente.`;
        }
    revealNameInput.value = ""; //Limpa o campo
    updateButtonStates(); // Desabilita o botão "Revelar"
  }
  //Inicializa o estado dos botões
    updateButtonStates();
  return main;
}

export default Main;
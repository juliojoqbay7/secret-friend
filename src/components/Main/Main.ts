import './Main.css';

import dev from '/dev.svg';

function Main() {
    const main = document.createElement('main');
    main.classList.add('main');

    main.innerHTML = `
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
            <img src=${dev} alt="Ilustração" class="illustration">
        </div>
    </div>
    `;

    // --- Elementos do DOM ---
    const addButton = main.querySelector('#add-button') as HTMLButtonElement;
    const participantNameInput = main.querySelector('#participant-name') as HTMLInputElement;
    const participantListContainer = main.querySelector('#participant-list-container')!;
    const drawButton = main.querySelector('#draw-button') as HTMLButtonElement;
    const drawResult = main.querySelector('#draw-result') as HTMLParagraphElement;
    const drawMessage = main.querySelector('#draw-message') as HTMLParagraphElement; //Mensagens de erro/sucesso do sorteio
    const revealNameInput = main.querySelector('#reveal-name') as HTMLInputElement;
    const revealButton = main.querySelector('#reveal-button') as HTMLButtonElement;
    const addMessage = main.querySelector('#add-message') as HTMLParagraphElement; // Mensagens de erro/sucesso da adição
    const resetButton = main.querySelector('#reset-button') as HTMLButtonElement;
    const revealContainer = main.querySelector('#reveal-container') as HTMLDivElement;

    // --- Variáveis de Estado ---
    let participants: string[] = [];
    let pairs: [string, string][] = [];
    let isDrawing: boolean = false; // Variável para controlar o estado do sorteio

    // --- Funções Auxiliares ---
    function showMessage(element: HTMLElement, message: string, type: 'success' | 'error' = 'success') {
        element.textContent = message;
        element.classList.remove('success', 'error');
        element.classList.add(type);
        setTimeout(() => {
            element.classList.remove('success', 'error');
            element.textContent = '';
        }, 3000);
    }

    // Função para atualizar toda a interface
    function updateUI() {
        // Botão de Adicionar
        addButton.disabled = false; // O botão de adicionar sempre fica habilitado

        // Botão de Sortear
        drawButton.disabled = participants.length < 2 || isDrawing;

        // Botão de Revelar
        revealButton.disabled = pairs.length === 0 || revealNameInput.value.trim() === '' || isDrawing;

        // Container de Revelação
        revealContainer.style.display = pairs.length > 0 && !isDrawing ? 'flex' : 'none';

        renderParticipantList(); // Sempre renderiza a lista
    }

    function resetApp() {
        participants = [];
        pairs = [];
        isDrawing = false; // Reseta o estado do sorteio
        participantNameInput.value = '';
        revealNameInput.value = '';
        drawResult.textContent = '';
        addMessage.textContent = '';
        drawMessage.textContent = '';
        updateUI(); // Atualiza a interface
    }

    // --- Event Listeners ---
    addButton.addEventListener('click', addParticipant);
    drawButton.addEventListener('click', drawSecretFriend);
    revealButton.addEventListener('click', revealSecretFriend);
    resetButton.addEventListener('click', resetApp);
    revealNameInput.addEventListener('input', updateUI); // Atualiza a interface ao digitar no campo

    // --- Funções Principais ---

    function addParticipant() {
        const name = participantNameInput.value.trim();

        if (name === '') {
            showMessage(addMessage, 'Por favor, digite um nome válido.', 'error');
            return;
        }

        if (participants.includes(name)) {
            showMessage(addMessage, 'Este nome já foi adicionado. Por favor, digite um nome diferente.', 'error');
            return;
        }

        participants.push(name);
        participantNameInput.value = '';
        showMessage(addMessage, 'Participante adicionado com sucesso!', 'success');
        updateUI(); // Atualiza a interface
    }

    function renderParticipantList() {
        participantListContainer.innerHTML = '';

        if (participants.length === 0) {
            participantListContainer.innerHTML = '<p>Nenhum participante adicionado ainda.</p>';
            return;
        }

        const ul = document.createElement('ul');
        participants.forEach((participant, index) => {
            const li = document.createElement('li');

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            removeButton.dataset.index = index.toString();
            removeButton.addEventListener('click', removeParticipant);

            li.textContent = participant;
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        participantListContainer.appendChild(ul);
    }

    function removeParticipant(event: Event) {
        const button = event.currentTarget as HTMLButtonElement;
        const index = parseInt(button.dataset.index!);

        participants.splice(index, 1);
        updateUI(); // Atualiza a interface
        showMessage(addMessage, 'Participante removido com sucesso!', 'success');
    }

    function drawSecretFriend() {
        if (participants.length < 2) {
            showMessage(drawMessage, 'Adicione pelo menos dois participantes para realizar o sorteio.', 'error');
            return;
        }

        isDrawing = true; // Define o estado de sorteio como "em andamento"
        updateUI();       // Atualiza a interface (desabilita botões, etc.)
        drawMessage.textContent = 'Sorteando...'; //Mensagem de sorteando
        // Simula um atraso para o sorteio (opcional, para dar um feedback visual)
        setTimeout(() => {
            const shuffledParticipants = [...participants];
            for (let i = shuffledParticipants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
            }

            pairs = createPairs(shuffledParticipants);

            isDrawing = false; // Finaliza o sorteio
            updateUI();       // Atualiza a interface
            showMessage(drawMessage, 'Sorteio realizado com sucesso!', 'success'); //Mensagem de sorteio realizado

        }, 1000); // 2 segundos de atraso (ajuste como quiser)
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
            showMessage(drawMessage, 'Por favor, digite seu nome para revelar seu amigo secreto.', 'error');
            return;
        }

        const foundPair = pairs.find(([participant, _]) => participant === revealName);

        if (foundPair) {
            drawResult.textContent = `O amigo secreto de ${revealName} é ${foundPair[1]}!`;
            showMessage(drawMessage, '', 'success');
        } else {
            showMessage(drawMessage, `Participante "${revealName}" não encontrado. Verifique se digitou o nome corretamente.`, 'error');
        }
        revealNameInput.value = '';
        updateUI();
    }

    // Inicializa a interface
    updateUI();

    return main;
}

export default Main;
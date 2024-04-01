// encontrar o botão adicionar tarefa
 
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            <button class="app_button-edit">Editar</button>
        </svg>
    `

    const paragrafo = document.createElement('p')
    
    const input = document.createElement('input')
    input.setAttribute('placeholder', 'O que você deseja alterar?');
    input.classList.add('input-modificar')
    input.setAttribute('style', `
        padding: 0.8em 6em;
        border-radius: 20px;
        border: 2px solid black;
        background-color: #9c9c9c;
    `)

    input.classList.add('hidden')

    const confirmar = document.createElement('button')
    confirmar.classList.add('botao-modificar')
    confirmar.classList.add('hidden')
    confirmar.innerHTML = 'Editar'
    confirmar.setAttribute('style', `
        font-family: Montserrat;
        font-weight: 500;
        background-color: #9c9c9c;
        padding: 0.4em 0.8em;
        border-radius: 20px;
        border: 2px solid black;
    `)

    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        input.value = ''
        input.classList.toggle('hidden')
        confirmar.classList.toggle('hidden')
        paragrafo.classList.toggle('hidden')
        
        confirmar.addEventListener('click', () => {
            input.classList.add('hidden')
            confirmar.classList.add('hidden')
            paragrafo.classList.remove('hidden')

            const novaDescricao = input.value
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        })

        
    }
    

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', './imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(input)
    li.append(confirmar)
    li.append(botao)

    return li
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    textArea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});
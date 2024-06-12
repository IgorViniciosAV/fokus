const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const imagemBotaoAdicionarTarefa = document.querySelector('.app__button-image')

const inputModificar = document.querySelector('.input-modificar')
const botaoModificar = document.querySelector('.botao-modificar')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

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
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const input = document.createElement('input')
    input.setAttribute('placeholder', 'Como deseja alterar?');
    input.classList.add('input-modificar')
    input.classList.add('hidden')

    const confirmar = document.createElement('button')
    confirmar.classList.add('botao-modificar')
    confirmar.classList.add('hidden')
    confirmar.innerHTML = 'Editar'


    const botao = document.createElement('button')
    botao.classList.add('botao-especificado')
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
            if (novaDescricao) {
                paragrafo.textContent = novaDescricao
                tarefa.descricao = novaDescricao
                atualizarTarefas()
            }
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

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        }
    }

    return li
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    imagemBotaoAdicionarTarefa.classList.toggle('imagem-animada')
})
btnCancelarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
    textArea.value = ''
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

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('.botao-especificado').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        paragrafoDescricaoTarefa.textContent = ''
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {

    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    paragrafoDescricaoTarefa.textContent = ''
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false)
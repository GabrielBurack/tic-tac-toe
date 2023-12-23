//variaveis dos jogadores
let player1 = 'X';
let player2 = 'O';

//inputs dos nomes 
let inputName1 = document.getElementById('inputName1')
let inputName2 = document.getElementById('inputName2')

//nome do jogador que deve jogar
let playerAtual = ""

//span de quem deve jogar agora
let spanName = document.getElementById('namePlayerInfo')

//cada casa do jogo
const gameButtons = document.querySelectorAll('.container > button');
gameButtons.forEach(function(btn) {
    btn.disabled = true;
});

//botao de start 
const startBtn = document.getElementById('start')

//botao de restart
const restartBtn = document.getElementById('restart')

inputName1.addEventListener('input', checkInputs)
inputName2.addEventListener('input', checkInputs)

//verifica se os players digitaram seus nomes
function checkInputs() {
    if (inputName1.value.trim() !== "" && inputName2.value.trim() !== "") {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
}

//botão de start para começar o jogo
startBtn.addEventListener('click', function() {
    spanName.textContent = inputName1.value
    playerAtual = player1
    restartBtn.disabled = false

    gameButtons.forEach(function(btn) {
        btn.disabled = false
    })
})

//botao para 'restartar' o jogo
restartBtn.addEventListener('click', function(){
    playerAtual = player1
    spanName.textContent = inputName1.value

    gameButtons.forEach(function(btn) {
        btn.disabled = false
        btn.innerText = ''
    })
})

function alteraNameSpan(){
    spanName.textContent = spanName.textContent === inputName1.value ? inputName2.value : inputName1.value; 
}

function alternarJogador() {
    playerAtual = playerAtual === 'X' ? 'O' : 'X';
}

gameButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        btn.innerText = playerAtual; // Altera o texto do botão clicado
        if (verificaVitoria(playerAtual)) {
            alert("Vitória! Jogador: " + spanName.textContent + " venceu.");
            gameButtons.forEach(function (btn){
                btn.disabled = true;
            })
            return;
        }
        alternarJogador();
        alteraNameSpan();
        btn.disabled = true; // Desabilita o botão após ser clicado
    });
});


function verificaVitoria(playerAtual) {
    let array = [];

    document.querySelectorAll('.container button').forEach(function (botao) {
        array.push(botao.innerText);
    });

    for (let i = 0; i < 3; i++) {
        if (
            (array[i] === playerAtual && array[i + 3] === playerAtual && array[i + 6] === playerAtual) || // Verificar colunas
            (array[i * 3] === playerAtual && array[i * 3 + 1] === playerAtual && array[i * 3 + 2] === playerAtual) // Verificar linhas
        ) {

            return true;
        }
    }
    // Verificar diagonais
    if (
        (array[0] === playerAtual && array[4] === playerAtual && array[8] === playerAtual) ||
        (array[2] === playerAtual && array[4] === playerAtual && array[6] === playerAtual)
    ) {
        return true;
    }
    return false;
}


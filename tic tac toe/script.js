let music = new Audio("music.mp3")
let nextTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
isgameover = false
let turn = "X";


//Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

//Function to check Win
const checkWin = () => {
    let boxInput = document.getElementsByClassName('input')
    let win = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90]
    ]

    //win check
    win.forEach(e => {
        if ((boxInput[e[0]].innerText === boxInput[e[1]].innerText) && ((boxInput[e[2]].innerText === boxInput[e[1]].innerText)) && (boxInput[e[0]].innerHTML !== "")) {
            document.querySelector('.turn').innerText = boxInput[e[0]].innerText + " Won"
            isgameover = true;
            document.querySelector('.img').getElementsByTagName('img')[0].style.width = "300px"
            document.querySelector('.line').style.width = "20vw"
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        }
    })

    //draw check
    if (!isgameover && Array.from(boxInput).every(box => box.innerText != '')) {
        document.querySelector('.turn').innerText = 'Match Draw'
        document.querySelector('.img2').getElementsByTagName('img')[0].style.width = '350px'

    }
}

//Game Logic
music.play()
music.volume = 0.15
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element => {
    let input = element.querySelector('.input')
    element.addEventListener("click", () => {
        if (input.innerText === "") {
            input.innerText = turn;
            turn = changeTurn();
            nextTurn.play();
            nextTurn.volume = 0.3
            if (!isgameover) {
                document.getElementsByClassName('turn')[0].innerText = "Turn for " + turn;
            }
            checkWin();
        }
    })
})

reset.addEventListener("click", () => {
    let inputs = document.querySelectorAll('.input')
    Array.from(inputs).forEach(element => {
        element.innerText = "";
        turn = 'X'
        isgameover = false;
        document.getElementsByClassName('turn')[0].innerText = "Turn for " + turn;
        document.querySelector('.img').getElementsByTagName('img')[0].style.width = "0px"
        document.querySelector('.img2').getElementsByTagName('img')[0].style.width = "0px"
        document.querySelector('.line').style.width = "0"
    })
})
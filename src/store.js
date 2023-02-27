import { writable,get } from "svelte/store";

export const sudokuData = writable(null)
export const userInputArray = writable(new Array(81))
export const correctAnswersArray = writable([])
export const backupArray = writable([])
export const controlIndex = writable(1)
export const buttonText = writable("")
export const solveAnswear = writable(false)
export const quantityOfNumbers = writable({})
export const currentElementId = writable(0)
export const enableHints = writable(false)
export const showNumerki = writable(false)
export const ifWin = writable(false)
export const showHints = writable(false)
export const enableBtnText = writable("")
export const lastestNumber = writable(0)
backupArray.set(get(userInputArray))


export function solveSudoku(){
    if(get(controlIndex) % 2==0)
    {
        userInputArray.set(get(backupArray))
        buttonText.set("show solution")
        solveAnswear.set(false)
    }
    else
    {
        backupArray.set(get(userInputArray))
        userInputArray.set(get(correctAnswersArray))  
        buttonText.set("hide solution")
        solveAnswear.set(true)
    }
    controlIndex.set(get(controlIndex)+1)
    getQuantityOfNumbers()
}

export function getQuantityOfNumbers(){
    let obj = {};
    [...new Set(get(correctAnswersArray))].forEach(val=>{
        const count = 9 - get(userInputArray).filter(x => x == val).length;
        obj[val] = (count <0)?0:count;
    })
    quantityOfNumbers.set(obj)
}

export function onKeyDown(e){
    let index = get(currentElementId)
    document.getElementById(index.toString()).classList.remove("focused")
    switch(e.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            updateElementValue(index, e.key)
            break;
        case "ArrowUp":
            if(index-9>=0) index = index -9
            changeFocusedElement(index, e.key)
            break;
        case "ArrowDown":
            if(index+9<81) index = index+9
            changeFocusedElement(index, e.key)
            break;
        case "ArrowLeft":
            if(index-1>=0) index = index-1
            changeFocusedElement(index, e.key)
            break;
        case "ArrowRight":
        case "Tab":
            if(index+1<81) index = index+1
            changeFocusedElement(index, e.key)
            break;
        case "Backspace":
        case "Delete":
            changeFocusedElement(index, e.key)
            break;
        default:
            changeFocusedElement(index, e.key)
            break;
    }
}

export const changeFocusedElement = (index, key) => {
    let newIndex = index;
    if (key === "Backspace" || key === "Delete") {
        const temp = get(userInputArray)
        temp[index] = ""
        userInputArray.set(temp)
        document.getElementById(index.toString()).classList.remove("correct")
        if (key == "Backspace") newIndex = Math.max(index - 1, 0)
        key = "ArrowLeft"
    }
    while (isDisable(newIndex)) {
      newIndex += (key !== "ArrowLeft") ? 1 : -1
      newIndex = (newIndex + 81) % 81
    }
  
    currentElementId.set(newIndex);
    document.getElementById(newIndex.toString()).classList.add("focused");
}
  
const updateElementValue = (index,text) =>{
    if(!document.getElementById(get(currentElementId).toString()).classList.contains("defaultValue")) 
    {
        if(!get(enableHints))
        {
            const temp = get(userInputArray)
            temp[index] = parseInt(text)
            userInputArray.set(temp)
        }
        else{
            document.getElementById(`sup-${index}`).innerText = text
        }
    }

    getQuantityOfNumbers()
    checkIfWin()

    let ID = index
    do{
        ID +=1
        if(ID >= 81) ID = 0
        if(ID < 0) ID = 80
    }while(isDisable(ID))

    document.getElementById(ID.toString()).classList.add("focused")
    currentElementId.set(ID)
}

const isDisable = (index) => {
    const element = document.getElementById(index.toString())
    return element && element.classList.contains("defaultValue")
  };
  
export const checkIfWin = () =>{
    if(JSON.stringify(get(userInputArray)) == JSON.stringify(get(correctAnswersArray)))
    {
        console.log("wygrałeś")
        showHints.set(false)
        showNumerki.set(false)
        ifWin.set(true)
    }  
}


export function checkSudoku(board) {
    // Sprawdzanie wierszy
    for (let i = 0; i < 9; i++) {
      let row = new Set();
      for (let j = 0; j < 9; j++) {
        if (row.has(board[i * 9 + j])) {
          return false;
        }
        if (board[i * 9 + j] !== '-') {
          row.add(board[i * 9 + j]);
        }
      }
    }
    
    // Sprawdzanie kolumn
    for (let i = 0; i < 9; i++) {
      let col = new Set();
      for (let j = 0; j < 9; j++) {
        if (col.has(board[i + j * 9])) {
          return false;
        }
        if (board[i + j * 9] !== '-') {
          col.add(board[i + j * 9]);
        }
      }
    }
    
    // Sprawdzanie kwadratów 3x3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let square = new Set();
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            let index = (i * 3 + k) * 9 + (j * 3 + l);
            if (square.has(board[index])) {
              return false;
            }
            if (board[index] !== '-') {
              square.add(board[index]);
            }
          }
        }
      }
    }
    
    return true;
  }
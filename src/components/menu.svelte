<script>
    import { getSudoku } from 'sudoku-gen';
    import { get } from "svelte/store";
    import { fade,fly} from "svelte/transition";
    import Sudoku from './sudoku.svelte';
    import { sudokuData,checkSudoku,ifWin,userInputArray,correctAnswersArray,controlIndex,enableHints,solveAnswear,quantityOfNumbers,getQuantityOfNumbers,lastestNumber, enableBtnText ,buttonText,currentElementId,showHints,showNumerki, } from '../store';
    
    const getSudokuFromNpm = () =>{
      $sudokuData = getSudoku()
      createSudoku()
    } 
   const handleChange = async (e) => {
      $sudokuData = null
      const file = e.target.files[0];
      if (file) {
        const jsonData = await file.text();
        // if(document.getElementById("sudoku-container")) document.getElementById("sudoku-container").innerHTML = ""
        try {
          $sudokuData = JSON.parse(jsonData);
          for (var i = 0; i < $sudokuData.puzzle.length; i++) {

            if (!($sudokuData.puzzle[i] == "-" || $sudokuData.puzzle[i] == $sudokuData.solution[i])) {
              throw new Error("Nie prawidłowa struktura sudoku lub wczytałeś stan gry z błędnymi polami");
              }
          }

        
          if (!$sudokuData.puzzle || !$sudokuData.solution) {
            $sudokuData = null
            throw new Error("Nieprawidłowy format pliku JSON");
          }
          if(!checkSudoku($sudokuData.puzzle)) throw new Error("Nieprawidłowy format sudoku");
          createSudoku()
          
        } catch (err) {
          alert("Coś nie tak z plikiem JSON: " + err.message);
          $sudokuData = null;
          return;
        }
      }
    }

    const createSudoku = () =>{
        Array.from(document.getElementsByClassName("correct")).forEach(element => {
          element.classList.remove("correct")
        });
        Array.from(document.getElementsByClassName("defaultValue")).forEach(element => {
          element.classList.remove("defaultValue")
        });

        for(let i=1;i<10;i++)
        {
          Array.from(document.getElementsByClassName(i.toString())).forEach(element => {
            element.classList.remove(i.toString())
          })
        }
        $userInputArray = []
        $userInputArray.length = 81
        $userInputArray.fill('')
        $correctAnswersArray = (get(sudokuData).solution).split("")
        $solveAnswear = false
        $enableHints = false
        for(let i=0;i<get(correctAnswersArray).length;i++)
        {
            $correctAnswersArray[i] = parseInt(get(correctAnswersArray)[i])
        } 
        console.log(get(correctAnswersArray))
        $controlIndex = 1

        $currentElementId = 0
        $buttonText = "show solution"

        $quantityOfNumbers = {}
        
        $showNumerki = false
        $showHints = false
        $ifWin = false
        getQuantityOfNumbers()
        $enableBtnText = "enable hints"
        $lastestNumber = 0
    }
</script>


{#if !$sudokuData}
    <div id="selectionList">
        <label class="application-btn" for="sudokuFile"  in:fly={{ duration:600, y:-200 }} >file</label>
        <input type="file" id="sudokuFile" accept=".json" on:change={handleChange} />
        <h3 in:fade={{ duration:500 }}>or...</h3>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="application-btn selectionListElement" id="generateSudoku" on:click={getSudokuFromNpm}  in:fly={{ duration:800,y:200}}>random</div>
    </div>
{:else}
    <Sudoku/>
{/if}
<script>
    import SudokuCell from "../components/UI/sudoku-cell.svelte";
    import { get } from "svelte/store";
    import { fade,fly} from "svelte/transition";
    import {showNumerki,showHints, enableBtnText,lastestNumber, sudokuData, userInputArray, enableHints,checkIfWin, solveSudoku, controlIndex,buttonText,quantityOfNumbers,getQuantityOfNumbers,solveAnswear,onKeyDown, correctAnswersArray} from  "../store"

    $showNumerki = false
    $showHints = false


    const setSudokuData = () => $sudokuData = null

    function showQuantityOfNumbers(){
      if($showHints) $showHints = !$showHints
      $showNumerki = !$showNumerki
      getQuantityOfNumbers()
    }
    const changeEnableOfHints = () => {
      $enableHints = !$enableHints
      if(get(enableHints)) $enableBtnText = "disable hints"
      else $enableBtnText = "enable hints"
    }
    const removeAllHints = () =>{
      document.querySelectorAll(".sup").forEach(el =>el.textContent = ``)
    }
    
    const showHintGridElement = (e) =>{ 
      if(get(controlIndex) % 2 !==0)
      {
          $lastestNumber = parseInt(e.target.textContent)
          Array.from(document.getElementsByClassName($lastestNumber.toString())).forEach(element => {
            element.textContent = $lastestNumber.toString()
          })
          const bindValues = get(userInputArray)
          Array.from(document.getElementsByClassName("sudoku-element")).forEach((element,i) => {
              bindValues[i] = (element.textContent !== "")?parseInt(element.textContent):""
          })
          $userInputArray = bindValues
          checkIfWin()    
       }
    }
    const showHintsGrid = () =>{
      if($showNumerki) $showNumerki = !$showNumerki
      $showHints = !$showHints
      if($showHints)
      {
          document.getElementById("sudoku-container").style.pointerEvents = "none"
      }
      else{
          document.getElementById("sudoku-container").style.pointerEvents = "all"
          $lastestNumber=0 
      }
      
    }

    function saveState(){
      const map1 = get(userInputArray).map(el => el == '' ? '-' : el);
      let obj = "{\"puzzle\":"+ JSON.stringify(map1.join("")) +",\"solution\":"+"\""+get(correctAnswersArray).join("")+"\"}";
      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(obj));
      element.setAttribute('download', "sudoku.json");
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element); 
    }

</script>
  <svelte:window on:keydown={(!$solveAnswear)?onKeyDown:()=>{}} />

<div class="main-container">
  {#if $sudokuData}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="navigation">
      <div class="application-btn" id="backButton" on:click={setSudokuData} in:fade>back</div>
      <div class="application-btn" id="saveBtnParent"  on:click={saveState} in:fade>save</div>
    </div>
    <div class="sudoku-container" id="sudoku-container">
      {#each get(sudokuData).puzzle.split("") as cell,i}
        {#if cell == "-"} 
          <SudokuCell id={i} />
        {:else}
          <SudokuCell text={cell} id={i} isDefault={true} />
        {/if}
      {/each}
    </div>
    <div id="application-buttons-div">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="solveSudokuBtn" on:click={solveSudoku}  in:fly={{  y: -100 , delay:800 }}>{$buttonText}</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="printPageBtn" on:click={() => window.print()}  in:fly={{  y: 100 , delay:800 }}>print page</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="showQuantityOfNumbersBtn" on:click={showQuantityOfNumbers} in:fly={{ y: -100 , delay:800 }}>quantity</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="enableHintsBtn" on:click={changeEnableOfHints} in:fly={{ y: 100 , delay:800 }}>{$enableBtnText}</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="removeAllHintsBtn" on:click={removeAllHints} in:fly={{  y: -100  , delay:800 }}>clear hints</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="application-btn" id="showHintsGridBtn" on:click={showHintsGrid} in:fly={{  y: 100 , delay:800 }}>grid</div>
    </div>
    {#key $showHints}
      {#if $showHints}
        <div class="hints-grid-parent" in:fade={{ duration:300 }}>
          {#each {length: 9} as _, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="hints-grid-element" on:click={showHintGridElement}>{i+1}</div>
          {/each}
        </div>
      {/if}
    {/key}
    {#key $showNumerki}
      {#if $showNumerki}
      <div id="quantityOfNumbersDiv" in:fade={{ duration:300 }}>
          <b class="numerkiTitle">numerki</b>
          <div class="showedNumerki">
            {#each Object.entries($quantityOfNumbers) as  [key, value]}
              <p><b style="padding-right:5px;">{key}:</b>{value}</p>
            {/each}
          </div>
        </div>
      {/if}
    {/key}
  {/if}
</div>


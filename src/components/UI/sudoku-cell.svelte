<script>
    import {currentElementId,userInputArray,correctAnswersArray} from "../../store"
    import { fly} from "svelte/transition";
    import { get } from "svelte/store";
    import "./sudoku-cell.css"
    export let text = "";
    export let id;
    export let isDefault = false;
    
    if(text != "") $userInputArray[id] = parseInt(text) 
    const handleClick = () => {
        if(!document.getElementById(id.toString()).classList.contains("defaultValue"))
        {
            document.getElementById(get(currentElementId).toString()).classList.remove("focused")
            $currentElementId = id
            document.getElementById(id.toString()).classList.add("focused")
        }
    } 
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="sudoku-element {isDefault?"defaultValue":""} {(id == $currentElementId)?'focused':''} {($userInputArray[id] == $correctAnswersArray[id])&&!isDefault?"correct":""}"
    id={id}
    in:fly={{ x:-200, delay:id*10 }}
    on:click={handleClick} 
>
{#key $userInputArray[id]}
    <span class="{isDefault?'':$correctAnswersArray[id]}">{$userInputArray[id]}<sup class="sup" id="sup-{id}"></sup></span>
{/key}
</div>
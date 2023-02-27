<script>
    import { fade } from "svelte/transition"
    import { ifWin,sudokuData } from "../store";


    const closePrompt = () =>{
        $ifWin = false
        $sudokuData = null
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="parent" in:fade={{ duration:500 }} on:click|self={closePrompt}>
    <div class="modal" >
        <h1>WYGRAŁEŚ!</h1>
        <p style="color:red">click background to close</p>
    </div>
</div>


<style>
.parent{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    display:grid;
    z-index:10;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0,0,0.7);
}
.modal{
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-radius: 40px;
    padding:40px;
    width:500px;
    height:200px;
    border: 2px solid whitesmoke;
    background-color: #1b1d24;
}

@media screen and (max-width:600px)
{
    .modal{
        width:390px;
        height:190px;
    }
}
/* .confetti{
    position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
} */

</style>
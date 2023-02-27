<script>
  import Menu from "./components/menu.svelte";
  import Footer from "./components/UI/footer.svelte";
  import Win from "./components/win.svelte";
  import { ifWin } from "./store";
  import { fade,fly } from "svelte/transition";

  let hide = false

  const closeLogo = () => hide= true

</script>


{#if !hide}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="parent" on:click={closeLogo} out:fade>
      <div class="modal" >
        <div class="header">
          <img src="../src/assets/sudoku.png" alt="img">
          <h1>SUDOKU</h1>
        </div>
        <p>click to play</p>
      </div>
</div>
{:else}
  <Menu />
  {#if $ifWin}
    <Win/>
  {/if}
  <Footer/>
{/if}

<style>
  .header{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:20px;
  }
  img{
    width:60px;
    height:60px;
  }
  img:hover{
    animation: spin 0.8s linear;
  }
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
    scale:1.4;
    cursor: pointer;
}
.modal{
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width:500px;
    height:200px;
    border:3px solid whitesmoke;
  
}
h1{
  font-size:60px;
  letter-spacing:4px;
}
p{
  animation: scale 5s linear infinite;
}
@keyframes scale{
  25%{
    scale:1.1;
  }
  50%{
    scale:0.9;
  }
  75%{
    scale:1.1;
  }
}

@keyframes spin{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>



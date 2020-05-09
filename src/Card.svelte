<script>
  import { writable } from 'svelte/store';
  export let image;
  export let name;
  export let visible;

  const isRevealed = writable(false);

  function flip() {
    isRevealed.set(!$isRevealed);
  }
</script>

<style>
  .card {
    align-items: center;
    border-radius: 4px;
    box-shadow: 2px 2px 4px #444;
    display: flex;
    height: 70vh;
    justify-content: center;
    margin: 0 auto;
    max-width: 90vw;
  }
  .card.hidden {
    display: none;
  }
  .card img {
    max-height: 100%;
    max-width: 100%;
  }
</style>

<section class="card" class:hidden={!visible} on:click={flip}>
  <img src={image} alt="" />
  {#if $isRevealed}
    <h2>{name}</h2>
  {/if}
</section>

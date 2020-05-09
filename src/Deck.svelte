<script>
  import { onMount } from "svelte";
  import Hammer from "hammerjs";
  import Card from "./Card.svelte";
  import characters from "./constants/images.json";

  const getRand = () => Math.floor(Math.random() * characters.length);
  const MAX = 10;
  const deck = [];
  let i = 1;
  let idx;
  while (true) {
    let idx = getRand();
    while (deck.find(charac => charac.name === characters[idx].name)) {
      idx = getRand();
    }
    deck.push(characters[idx]);
    if (deck.length === MAX) {
      break;
    }
  }
  let cur = 0;
  function prev() {
    if (cur > 0) cur -= 1;
  }
  function next() {
    if (cur < deck.length - 1) cur += 1;
  }
  
  onMount(() => {
    const hammertime = new Hammer(document.querySelector(".deck"));
    hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammertime.on("swipeleft", next);
    hammertime.on("swiperight", prev);
  });
</script>

<style>
  .wrapper {
    align-items: center;
    display: grid;
    height: calc(100vh - 5rem);
  }
  .pagination {
    color: #f2f2f2;
    line-height: 2em;
    margin: 2rem auto;
    text-align: center;
  }
  .material-icons {
    color: #f2f2f2;
  }
  .disabled .material-icons {
    color: #999;
  }
</style>

<div class="wrapper">
<div class="deck">
  {#each deck as chr, num}
    <Card
      visible={num === cur}
      name={chr.name}
      image={`./images/${chr.image}`} />
  {/each}
  
  <ul class="pagination">
    <li class:disabled={cur < 1} class="waves-effect" on:click={prev}>
      <a href="#!">
        <i class="material-icons">chevron_left</i>
      </a>
    </li>
    <li>{cur + 1} of {deck.length}</li>
    <li class:disabled={cur >= deck.length} class="waves-effect" on:click={next}>
      <a href="#!">
        <i class="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
</div>
</div>
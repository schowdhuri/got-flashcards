<script>
  import Card from "./Card.svelte";
  import characters from "./constants/images.json";

  const getRand = () => Math.floor(Math.random() * characters.length);
  const MAX = 5;
  const list = [];
  let i = 1;
  let idx;
  while(true) {
    let idx = getRand();
    while(list.find(charac => charac.name === characters[idx].name)) {
      idx = getRand();
    }
    list.push(characters[idx]);
    if(list.length === MAX) {
      break;
    }
  }
  let cur = 1;
  function prev() {
    if(cur > 0)
      cur -= 1;
  }
  function next() {
    if(cur < characters.length - 1)
      cur += 1;
  }
  
</script>

<style>
  .score {
    margin: 2rem 0;
    text-align: center
  }
</style>

<div>
  {#each characters as chr, num}
    <Card visible={num===cur} name={chr.name} image={`/images/${chr.image}`} />
  {/each}
  <div class="score">
    {cur} of {characters.length}
  </div>
  <button on:click={prev}>Prev</button>
  <button on:click={next}>Next</button>
</div>
<script>
  import { writable } from "svelte/store";
  export let image;
  export let name;
  export let visible;

  const isRevealed = writable(false);

  function flip() {
    isRevealed.set(!$isRevealed);
  }
  
</script>

<style>
  .hidden {
    display: none;
  }
  .card {
    background: #404044 url(../parchment.jpg) center no-repeat;
    background-size: cover;
    position: relative;
  }
  .hotspot {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .card-image {
    display: flex;
  }
  .card-image img {
    border-radius: 2px;
    max-height: 70vh;
    object-fit: contain;
    pointer-events: none;
  }
  .card .card-reveal {
    height: auto;
  }
</style>

<div class="row" class:hidden={!visible} on:click={flip}>
  <div class="col s12 m12">
    <div class="card">
      <div class="hotspot activator" />
      <div class="card-image">
        <img class="activator" src={image} alt="" />
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
          {name}
          <i class="material-icons right">close</i>
        </span>
      </div>
    </div>
  </div>
</div>

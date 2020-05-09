<script>
  import Deck from "./Deck.svelte";
</script>

<style>
  main {
    background: #000 url("../got-bg.jpg") center no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
  nav {
    background-color: #000;
  }
  .brand-logo {
    display: flex;
    height: 100%;
    padding: 10px 0;
  }
  .logo {
    max-height: 100%;
    max-width: 80vw;
  }
</style>

<main>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">
        <img class="logo" src="got.jpg" alt="GoT Flashcards" />
      </a>
    </div>
  </nav>
  <div class="container">
    <Deck />
  </div>
</main>

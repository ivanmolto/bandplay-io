<script>
  import { createEventDispatcher } from "svelte";
  export let title;
  const dispatch = createEventDispatcher();
  function closeModal() {
    dispatch("cancel");
  }
</script>

<style>
  .modal-backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }
  .modal {
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
  }
  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
</style>

<div class="modal-backdrop fixed font-montserrat" on:click={closeModal} />
<div
  class="modal font-montserrat fixed bg-gray-200 rounded-lg shadow-lg overflow-scroll z-50">
  <div
    class="p-4 mx:auto border-b text-orange-600 border-orange-600 text-bold text-2xl content-center">
    {title}
  </div>
  <div class="p-4">
    <slot name="content" />
  </div>
  <footer class="p-4">
    <slot name="footer" />
  </footer>
</div>

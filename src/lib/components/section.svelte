<script lang="ts">
  export let heading;
  export let description;
  export let img;
  export let reversed = false;

  $: order = reversed ? 2 : 1;
</script>

<article class="md:flex md:space-y-0 rounded-xl border-2 overflow-hidden border-white/20 hover:bg-white/10 transition-all duration-300">
  <span class="flex-col space-y-0 md:space-y-6 p-8 max-w-lg order-{order}">
    <h1 class="text-4xl font-black text-white">{heading}</h1>

    <p>{description}</p>
  </span>
  <img class="md:shrink-0 w-full object-cover h-64 md:w-80 order-1" src="{img}" alt="">
</article>
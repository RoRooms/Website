<script lang="ts">
  export let heading;
  export let description;
  export let type: "img" | "video" = "img";
  export let src;
  export let reversed = false;
</script>

<article class="md:flex md:space-y-0 rounded-xl border-2 overflow-hidden border-white/20 hover:bg-white/10 transition-all duration-300">
  <span style="order: {reversed ? 2 : 1};" class="flex-col space-y-0 md:space-y-6 p-8 max-w-lg">
    <h1 class="text-4xl font-black text-white">{heading}</h1>

    <p>{description}</p>
  </span>
  <span style="order: {reversed ? 1 : 2};" class="md:shrink-0 w-full h-64 md:w-80 overflow-hidden relative flex items-center place-content-center">
    {#if type == "img"}
      <span class="w-full h-full bg-center bg-cover" style="background-image: url({src});" />
    {:else if type == "video"}
      <video autoplay loop muted class="w-full">
        <source src="{src}" />
        <track kind="captions" />
      </video>
    {/if}
  </span>
</article>
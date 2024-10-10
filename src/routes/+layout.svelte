<script>
  import "../app.css";
  import Logo from "$lib/components/logo.svelte";
</script>

<div class="w-full h-screen flex flex-col">
  <div class="navbar pl-8 pr-8 bg-zinc-900 overflow-hidden sticky top-0 z-10 drop-shadow-md">
    <div class="navbar-start">
      <a href="/">
        <Logo classes="h-9 hover:drop-shadow-[0_4px_4px_rgba(255,255,255,0.3)] duration-300" />
      </a>
    </div>

    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/install" class="font-bold">Install</a></li>
        <li><a href="/docs" class="font-bold">Docs</a></li>
        <li><a href="/publish" class="font-bold">Publish</a></li>
      </ul>
    </div>

    <div class="navbar-end">
      Username
    </div>
  </div>

  <slot />
</div>

<script>
  import Section from "$lib/components/section.svelte";
  import InterfaceDemo from "$lib/media/InterfaceDemo.mp4";
  import GitHub from "$lib/media/GitHub.png";
  import PlayersFirst from "$lib/media/PlayersFirst.png";
  import NetworkPattern from "$lib/media/NetworkPattern.png";
  import Logo from "$lib/components/logo.svelte";
</script>

<div class="w-full flex flex-col">
  <div id="intro" class="w-full flex flex-col items-center space-y-16 p-24 py-40 bg-cover bg-[url($lib/media/Banner.png)] drop-shadow-[0_300px_100px_#8566FF20]">
    <h1 class="text-5xl font-black text-white drop-shadow-md text-center">Elevate your worlds.</h1>
    <span class="flex flex-row space-x-3">
      <a href="/install" class="btn btn-secondary duration-300 hover:-translate-y-0.5">Install</a>
      <a href="/discord" class="btn btn-secondary btn-outline duration-300 hover:-translate-y-0.5">Discuss</a>
    </span>
  </div>
  <div id="points" class="w-full flex flex-col items-center">
    <span class="space-y-6 flex-col bg-black px-4 lg:p-20 py-20">
      <Section heading="Roleplay toolkit 🙋" description="With profiles, items, emotes and more, your world has everything it needs to engage players." type="video" src={InterfaceDemo} />
      <Section reversed heading="Worlds network 🌐" description="By participating in the universal worlds network, you can reach more players than possible alone." src={NetworkPattern} />
      <Section heading="Players-first 🙌" description="A seamless social experience, hopping between worlds with friends, and enjoying more time in-game." src={PlayersFirst} />
      <Section reversed heading="Free and open 🕊️" description="It's all customizable and open source, so you can change whatever you like. They're your worlds, after all." src={GitHub} />
    </span>
  </div>
  <div id="get-started" class="w-full flex flex-col items-center bg-[url($lib/media/Banner.png)] bg-center py-28 hover:brightness-105 duration-300">
    <button class="btn btn-lg btn-secondary">Get started</button>
  </div>
  <footer id="footer" class="w-full flex flex-row flex-space justify-between flex-wrap py-16 px-8 lg:px-24 bg-black space-y-4">
    <span>
      <Logo classes="h-10 opacity-80" />
    </span>
    <span class="flex flex-row space-x-4">
      <a href="/terms" class="link">Terms of Service</a>
      <a href="/terms" class="link">Privacy Policy</a>
    </span>
  </footer>
</div>

<style>
  #points {
    background-image: url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 0H0v36h36V0zM15.126 2H2v13.126c.367.094.714.24 1.032.428L15.554 3.032c-.188-.318-.334-.665-.428-1.032zM18 4.874V18H4.874c-.094-.367-.24-.714-.428-1.032L16.968 4.446c.318.188.665.334 1.032.428zM22.874 2h11.712L20 16.586V4.874c1.406-.362 2.512-1.468 2.874-2.874zm10.252 18H20v13.126c.367.094.714.24 1.032.428l12.522-12.522c-.188-.318-.334-.665-.428-1.032zM36 22.874V36H22.874c-.094-.367-.24-.714-.428-1.032l12.522-12.522c.318.188.665.334 1.032.428zm0-7.748V3.414L21.414 18h11.712c.362-1.406 1.468-2.512 2.874-2.874zm-18 18V21.414L3.414 36h11.712c.362-1.406 1.468-2.512 2.874-2.874zM4.874 20h11.712L2 34.586V22.874c1.406-.362 2.512-1.468 2.874-2.874z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-size: 70px 70px;
  }

  #intro::after {
    content: "";
    position: absolute;
    bottom: 0px; /* Align to the bottom */
    left: 0;
    right: 0;
    height: 25px; /* Height of the fade blur */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #100c1e 100%); /* Adjust colors as needed */
    pointer-events: none; /* Ensure the pseudo-element does not interfere with interactions */
  }
</style>
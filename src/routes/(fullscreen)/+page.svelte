<script>
  import Section from "$lib/components/section.svelte";
  import InterfaceDemo from "$lib/media/InterfaceDemo.mp4";
  import GitHub from "$lib/media/GitHub.png";
  import PlayersFirst from "$lib/media/PlayersFirst.png";
  import NetworkPattern from "$lib/media/NetworkPattern.png";
</script>

<div class="w-full flex flex-col">
  <div id="intro" class="w-full flex flex-col items-center space-y-16 p-24 pt-40 pb-40 bg-cover bg-[url($lib/media/Banner.png)]">
    <h1 class="text-5xl font-black text-white drop-shadow-md text-center">Elevate your worlds.</h1>
    <span class="flex flex-row space-x-3">
      <a href="/install" class="btn btn-secondary">Install</a>
      <a href="/discord" class="btn btn-secondary btn-outline">Discuss</a>
    </span>
  </div>
  <div id="points" class="w-full p-4 pt-16 pb-16 space-y-6 flex flex-col items-center">
    <Section heading="Roleplay toolkit 🙋" description="With profiles, items, emotes and more, your world has everything it needs to engage players." type="video" src={InterfaceDemo} />
    <Section reversed heading="Worlds network 🌐" description="By participating in the universal worlds network, you can reach more players than possible alone." src={NetworkPattern} />
    <Section heading="Players-first 🙌" description="A seamless social experience, hopping between worlds with friends, and enjoying more time in-game." src={PlayersFirst} />
    <Section reversed heading="Free and open 🕊️" description="It's all customizable and open source, so you can change whatever you like. They're your worlds, after all." src={GitHub} />
  </div>
</div>
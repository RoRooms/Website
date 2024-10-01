<script>
  import Section from "$lib/components/section.svelte";
</script>

<div class="w-full flex flex-col">
  <div id="intro" class="w-full flex flex-col items-center space-y-16 p-24 pt-40 pb-40 bg-gradient-to-l from-[#4219e5] to-[#7c5bff]">
    <h1 class="text-5xl font-black text-white drop-shadow-md text-center">Elevate your worlds.</h1>
    <span class="flex flex-row space-x-3">
      <a href="/install" class="btn btn-secondary">Install</a>
      <a href="/docs" class="btn btn-secondary btn-outline">Learn more</a>
    </span>
  </div>
  <div id="points" class="w-full p-4 pt-16 pb-16 space-y-6 flex flex-col items-center justify-center">
    <Section heading="All-in-one roleplay toolkit 🙋" description="With profiles, items, emotes and more, your world has everything it needs to engage players." img="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    <Section reversed heading="Shared worlds network 🌐" description="By sharing one, universal network, you can reach more players than possible alone." img="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    <Section reversed heading="Players-first 🙌" description="A seamless social experience, hopping between worlds with friends, and enjoying more time in-game." img="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    <Section heading="Free and open 🕊️" description="It's all customizable and open source, so you can change whatever you like. They're your worlds, after all." img="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </div>
</div>

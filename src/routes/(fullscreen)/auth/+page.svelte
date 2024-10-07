<script lang="ts">
  // import {SignIn} from "@auth/sveltekit/components";
  import Logo from "$lib/components/logo.svelte";
</script>

<div class="w-full h-full flex justify-center place-items-center bg-gradient-to-l from-[#4219e5] to-[#7c5bff]">
  <span class="p-8 rounded-xl flex card bg-black space-y-4 justify-items-center drop-shadow-lg">
    <Logo classes="h-10" />

    <span class="divider" />

    <span>
      <!-- <SignIn provider="roblox" signInPage="auth">
        <span slot="submitButton">
          <button class="w-60 btn bg-white border-white font-bold text-black hover:border-zinc-200 hover:bg-zinc-200">Sign in with Roblox <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 56 55" fill="none"><path d="M41.3326 50.6L4.90002 40.7693L14.6694 4.4L51.1 14.2307L41.3326 50.6ZM34.4449 23.8226L24.2771 21.0252L21.5551 31.1774L31.723 33.9749L34.4449 23.8226Z" fill="black"/></svg></button>
        </span>
      </SignIn> -->
    </span>
  </span>
</div>
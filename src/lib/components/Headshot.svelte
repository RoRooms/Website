<script lang="ts">
  import { page } from "$app/stores";
  import { signIn } from "@auth/sveltekit/client";
</script>

<button on:click={() => {
  signIn()
}}>
  <img src={$page.data.session?.user?.image ?? "a"} alt="" class="w-10 rounded-full bg-neutral-800">
</button>
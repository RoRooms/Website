<script lang="ts">
	import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import SignIn from "$lib/components/SignIn.svelte";

  export let data: PageData;
</script>

{#if $page.data.session?.user == null}
  <SignIn />
{:else}
<div class="flex flex-col space-y-4 max-w-md grow">
  <h1 class="text-3xl font-bold">Publish world</h1>
  <form id="publish-world" method="POST" action="?/publish" class="flex flex-col flex-1 space-y-2" use:enhance={({data: formData}) => {
    alert(`${data?.success}`)
}}>
    <div class="form-control">
      <div class="label">
        <span class="label-text">Place Id</span>
      </div>
      <input name="placeId" type="number" placeholder="123456789" required class="input">
    </div>
    <div class="form-control">
      <label for="tosAccepted" class="label">
        <span class="label-text">I have read and agree to both the <a class="link" target="_blank" href="https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use">Roblox</a> and <a class="link" target="_blank" href="/terms">RoRooms</a> Terms of Service</span>
        <input name="tosAccepted" type="checkbox" class="checkbox checkbox-primary" id="tosAccepted" required>
      </label>
    </div>
    <button class="btn btn-primary">Publish!</button>
  </form>
</div>
{/if}




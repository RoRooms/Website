<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import SignIn from "$lib/components/SignIn.svelte";

  export let form;

  page.subscribe((pageData) => {
    if (pageData?.form?.reason) {
      alert(`${pageData?.form?.reason}`)
    }
  })
</script>

{#if $page.data.session?.user == null}
  <SignIn />
{:else}
<div class="flex flex-col space-y-4 max-w-md grow prose">
  <h1>Unpublish world</h1>
  <form method="POST" class="flex flex-col flex-1 space-y-2" use:enhance>
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
    <button class="btn btn-primary">Unpublish</button>
  </form>
  <div class="divider"></div>
  <ul>
    <li>If you have any questions or concerns, you're welcome to <a href="/discord">contact support</a>. 💬</li>
    <li>Unpublishing will take a while to update across all servers on the network. ⏳</li>
    <li>By unpublishing, other worlds will no longer recognize or list your world. 🏝️</li>
  </ul>
</div>
{/if}

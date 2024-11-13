<script lang="ts">
  import { page } from "$app/stores";
  import SignIn from "$lib/components/SignIn.svelte";
  import { browser } from "$app/environment";

  export let form;

  if (browser) {
    if (form?.reason) {
      alert(`${form?.reason}`)
    } else if (form?.success == true) {
      alert('Published successfully! 🎉')
    }
  }
  
</script>

{#if $page.data.session?.user == null}
  <SignIn />
{:else}
<div class="flex flex-col space-y-4 max-w-md grow prose">
  <h1>Publish world</h1>
  <form id="publish-world" method="POST" action="?/publish" class="flex flex-col flex-1 space-y-2">
    <div class="form-control">
      <div class="label">
        <span class="label-text">Place Id</span>
      </div>
      <input name="placeId" type="number" placeholder="123456789" required class="input">
    </div>
    <div class="form-control">
      <label for="tosAccepted" class="label">
        <span class="label-text">I have read and agree to both the <a class="link" target="_blank" href="https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use">Roblox</a> and <a class="link" target="_blank" href="/terms">Rorooms</a> Terms of Service</span>
        <input name="tosAccepted" type="checkbox" class="checkbox checkbox-primary" id="tosAccepted" required>
      </label>
    </div>
    <button class="btn btn-primary">Publish!</button>
  </form>
  <div class="divider"></div>
  <div>
    <h2>Keep in mind</h2>
    <p>Worlds <b>must:</b></p>
    <ul>
      <li>Utilize the Rorooms framework, with world discovery enabled. 🌐</li>
      <li>Not directly <i>or</i> indirectly promote Roblox ToS violation. ⚠️</li>
    </ul>
    <p>Delisting is subject to Rorooms' discretion. You are always welcome to fork the network.</p>
  </div>
  <div class="divider"></div>
  <a href="/unpublish">I'd like to unpublish my world</a>
</div>
{/if}

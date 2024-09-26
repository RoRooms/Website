<script>
  import Logo from "$lib/components/logo.svelte";
</script>

<div>
  <div class="navbar p-0 pl-12 pr-12 bg-zinc-900">
    <div class="navbar-start">
      <a href="/">
        <Logo classes="h-9" />
      </a>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/publish" class="font-bold">Publish</a></li>
        <li><a href="/plugin" class="font-bold">Plugin</a></li>
      </ul>
    </div>

    <div class="navbar-end">
      Username
    </div>
  </div>

  <div class="p-12 w-full h-full">
    <div class="flex flex-col space-y-4 max-w-sm">
      <h1 class="text-3xl font-bold">Publish world</h1>
      <form id="publish-world" method="POST" action="?/publish" class="flex flex-col flex-1 space-y-2">
        <div class="form-control">
          <div class="label">
            <span class="label-text">Place Id</span>
          </div>
          <input name="placeId" type="number" placeholder="123456789" required class="input">
        </div>
        <div class="form-control">
          <label for="tosAccepted" class="label">
            <span class="label-text">I agree to both the <a class="link" target="_blank" href="https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use">Roblox</a> and <a class="link" target="_blank" href="/terms">RoRooms</a> Terms of Service</span>
            <input name="tosAccepted" type="checkbox" class="checkbox checkbox-primary" id="tosAccepted" required>
          </label>
        </div>
        <button class="btn btn-primary">Publish!</button>
      </form>
    </div>
  </div>
</div>

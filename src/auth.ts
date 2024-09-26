import { SvelteKitAuth } from '@auth/sveltekit';
import Roblox from '@auth/sveltekit/providers/roblox';

export const { handle, signIn } = SvelteKitAuth({
	providers: [Roblox]
});

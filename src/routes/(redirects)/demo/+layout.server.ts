import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, 'https://roblox.com/games/15103680499/Rorooms-Demo');
}

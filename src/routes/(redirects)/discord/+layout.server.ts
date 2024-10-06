import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, 'https://discord.gg/rpp9y3EzUb');
}

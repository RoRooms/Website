import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(302, 'https://docs.rorooms.com/docs/intro');
}

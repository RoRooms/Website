import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	if (!locals.user) {
		redirect(307, '/publish');
	}
}

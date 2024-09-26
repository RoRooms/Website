import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (events) => {
	const session = await events.locals.auth();

	if (!session?.user?.userId) {
		redirect(303, `/auth`);
	}

	return {
		session
	};
};

export const actions = {
	publish: async (event) => {
		event.request.formData().then((formData) => {
			const data = formData;
			const tosAccepted = data.get('tosAccepted');
			const placeId = data.get('placeId');
		});
	}
};

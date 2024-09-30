import { redirect } from '@sveltejs/kit';

export const load = async (events) => {
	const session = await events.locals.auth();

	if (!session?.user) {
		redirect(307, '/auth/signin');
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

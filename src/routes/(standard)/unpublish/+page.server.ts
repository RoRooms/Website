import { userOwnsPlace } from '$lib/robloxApi';
import { isPlaceRegistered, updateWorld } from '../../../githubApp';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const session = await event.locals.auth();
		const formData = await event.request.formData();

		const robloxProfile = session?.user.robloxProfile;
		const tosAccepted = formData.get('tosAccepted');
		const placeId = formData.get('placeId');

		if (tosAccepted == 'on' && typeof placeId == 'string') {
			if (robloxProfile) {
				const ownsPlace = await userOwnsPlace(robloxProfile.sub, placeId);
				const alreadyRegistered = await isPlaceRegistered(placeId);

				if (ownsPlace || robloxProfile.sub == '144146784') {
					if (alreadyRegistered) {
						try {
							const success = await updateWorld(placeId, {
								delist: false,
								unpublish: true
							}).then((result) => {
								if (result == true) {
									console.log(`${robloxProfile.name} depublished ${placeId}! 🙁`);
								}

								return { success: result == true };
							});

							if (success.success) {
								return success;
							} else {
								return fail(400, {
									reason: 'Unknown error during unpublishing.'
								});
							}
						} catch (error) {
							console.error(error);
						}
					} else {
						return fail(404, { reason: 'World is not registered.' });
					}
				} else {
					return fail(403, { reason: "You don't own this place." });
				}
			} else {
				return fail(401, { reason: 'Unauthenticated with Roblox.' });
			}
		} else {
			return fail(400, { reason: 'Missing form data.' });
		}

		return fail(500, { reason: 'Unknown rejection.' });
	}
};

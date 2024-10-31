import { getUniverseDetails, getUniverseId, userOwnsPlace } from '$lib/robloxApi';
import { isPlaceRegistered, placePassesChecks, updateWorld } from '../../../githubApp';

export const actions = {
	publish: async (event) => {
		const session = await event.locals.auth();
		const formData = await event.request.formData();

		const robloxProfile = session?.user.robloxProfile;
		const tosAccepted = formData.get('tosAccepted');
		const placeId = formData.get('placeId');

		if (robloxProfile && tosAccepted == 'on' && typeof placeId == 'string') {
			const ownsPlace = await userOwnsPlace(robloxProfile.sub, placeId);
			const universeId = await getUniverseId(placeId);
			const universeDetails = await getUniverseDetails(universeId);
			const alreadyRegistered = await isPlaceRegistered(placeId);
			const passesChecks = placePassesChecks(placeId, universeDetails);

			if (ownsPlace && (passesChecks || alreadyRegistered)) {
				try {
					await updateWorld(placeId, {
						initialRegistration: !alreadyRegistered,
						delist: !passesChecks,
						universeId: universeId
					}).then((result) => {
						if (result == true) {
							console.log(`${robloxProfile.name} updated ${placeId}! 🎉`);
						}
					});
				} catch (error) {
					console.error(error);
				}
			}
		}

		return false;
	}
};

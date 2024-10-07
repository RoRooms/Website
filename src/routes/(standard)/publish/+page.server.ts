import * as cheerio from 'cheerio';
import { registerPlace } from '../../../githubApp';

async function fetchPlaceCreatorUrl(placeId: string) {
	try {
		const response = await fetch(`https://www.roblox.com/games/${placeId}`);
		const body = await response.text();
		const $ = cheerio.load(body);

		const gameCreatorText = $('.game-creator a').attr('href');

		return gameCreatorText;
	} catch (error) {
		console.error('Error fetching the page:', error);

		return null;
	}
}

async function getCreatorFromUrl(url: string) {
	const groupMatch = url.match(/roblox\.com\/groups\/([^/]+)/);
	const userMatch = url.match(/roblox\.com\/users\/([^/]+)/);

	if (groupMatch) {
		return {
			type: 'group',
			id: groupMatch[1]
		};
	} else if (userMatch) {
		return {
			type: 'user',
			id: userMatch[1]
		};
	}

	return null;
}

async function getCreatorFromPlaceId(placeId: string) {
	const url = await fetchPlaceCreatorUrl(placeId);

	if (typeof url == 'string') {
		return await getCreatorFromUrl(url);
	}

	return null;
}

async function getGroupOwnerUserId(groupId: string) {
	const response = await fetch(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`);

	if (response.ok) {
		const groupInfo = await response.json();
		const ownerUserId = groupInfo.data[0].owner?.id;

		if (ownerUserId) {
			return ownerUserId;
		}
	}
}

async function getPlaceOwnerUserId(placeId: string) {
	return getCreatorFromPlaceId(placeId).then((creator) => {
		if (creator?.type == 'group') {
			return getGroupOwnerUserId(creator.id);
		} else {
			return Number(creator?.id);
		}
	});
}

async function userOwnsPlace(userId: string, placeId: string) {
	const ownerUserId = await getPlaceOwnerUserId(placeId);

	if (userId == ownerUserId) {
		return true;
	} else {
		return false;
	}
}

export const actions = {
	publish: async (event) => {
		const session = await event.locals.auth();
		const formData = await event.request.formData();

		const robloxProfile = session?.user.robloxProfile;
		const tosAccepted = formData.get('tosAccepted');
		const placeId = formData.get('placeId');

		if (robloxProfile && tosAccepted == 'on' && typeof placeId == 'string') {
			const ownsPlace = await userOwnsPlace(robloxProfile.sub, placeId);

			if (ownsPlace) {
				try {
					await registerPlace(placeId).then((result) => {
						console.log(result);
					});

					return true;
				} catch (error) {
					console.error(error);
				}
			} else {
				return false;
			}
		}
	}
};

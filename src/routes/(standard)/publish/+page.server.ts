import { redirect } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

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

			if (tosAccepted == 'on' && typeof placeId == 'string') {
				getPlaceOwnerUserId(placeId).then((userId) => {
					console.log(userId);
				});
			}
		});
	}
};

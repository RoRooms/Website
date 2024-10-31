import * as cheerio from 'cheerio';

export async function fetchPlaceCreatorUrl(placeId: string) {
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

export async function getCreatorFromUrl(url: string) {
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

export async function getCreatorFromPlaceId(placeId: string) {
	const url = await fetchPlaceCreatorUrl(placeId);

	if (typeof url == 'string') {
		return await getCreatorFromUrl(url);
	}

	return null;
}

export async function getGroupOwnerUserId(groupId: string) {
	const response = await fetch(`https://groups.roblox.com/v2/groups?groupIds=${groupId}`);

	if (response.ok) {
		const groupInfo = await response.json();
		const ownerUserId = groupInfo.data[0].owner?.id;

		if (ownerUserId) {
			return ownerUserId;
		}
	}
}

export async function getPlaceOwnerUserId(placeId: string) {
	return getCreatorFromPlaceId(placeId).then((creator) => {
		if (creator?.type == 'group') {
			return getGroupOwnerUserId(creator.id);
		} else {
			return Number(creator?.id);
		}
	});
}

export async function userOwnsPlace(userId: string, placeId: string) {
	const ownerUserId = await getPlaceOwnerUserId(placeId);

	if (userId == ownerUserId) {
		return true;
	} else {
		return false;
	}
}

export async function getUniverseId(placeId: string) {
	const response = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);

	if (response.ok) {
		const json = await response.json();
		const universeId = json.universeId;

		if (universeId) {
			return universeId.toString();
		}
	}
}

export async function getUniverseDetails(universeId: string) {
	const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);

	if (response.ok) {
		const json = await response.json();

		return json?.data[0];
	}
}

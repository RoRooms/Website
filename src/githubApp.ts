import { env } from '$env/dynamic/private';
import { getUniverseId } from '$lib/robloxApi';
import { App } from 'octokit';

type WorldFileContent = {
	created?: number;
	updated: number;
	delisted: boolean;
	universeId: string;
};

const OWNER = 'RoRooms';
const REPO = 'Worlds';

const app = new App({
	appId: env.GITHUB_APP_ID,
	privateKey: env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
});

const octokit = await app.getInstallationOctokit(55535552);

console.log(`GitHub app authenticated as.`);

function updateContent(oldContent: WorldFileContent, newContent: WorldFileContent) {
	const updatedContent = structuredClone(oldContent);
	const updatedKeys = [];

	for (const key in newContent) {
		const newValue = newContent[key];
		const oldValue = updatedContent[key];

		if (newValue != oldValue) {
			updatedContent[key] = newValue;

			updatedKeys.push(key);
		}
	}

	return { updatedContent, updatedKeys };
}

async function getFileContent(path: string) {
	try {
		const content = await octokit.rest.repos.getContent({
			owner: OWNER,
			repo: REPO,
			path: path
		});

		if (content?.data) {
			return content;
		}
	} catch {
		return null;
	}
}

async function updateFile(path: string, content: WorldFileContent, message: string) {
	if (typeof path == 'string') {
		const fileContent = await getFileContent(path);

		const existingContent = (fileContent?.data?.content || '').replace(/[\r\n]+/g, ' ');
		const existingContentObject = JSON.parse(atob(existingContent));
		const { updatedContent, updatedKeys } = updateContent(existingContentObject, content);
		const newContentEncoded = Buffer.from(JSON.stringify(updatedContent)).toString('base64');

		if (atob(existingContent) !== atob(newContentEncoded) && updatedKeys.length > 1) {
			const response = await octokit.rest.repos.createOrUpdateFileContents({
				owner: OWNER,
				repo: REPO,
				path: path,
				message: message,
				content: newContentEncoded,
				sha: fileContent?.data?.sha,
				committer: {
					name: 'Publishing Bot',
					email: 'noreply@rorooms.com'
				},
				author: {
					name: 'Publishing Bot',
					email: 'noreply@rorooms.com'
				}
			});

			if (response?.status == 201) {
				return true;
			}
		}
	}

	return false;
}

export async function updateWorld(
	placeId: string,
	options: {
		initialRegistration?: boolean;
		delist: boolean;
		universeId?: string;
	}
) {
	const fileContent: WorldFileContent = {
		updated: Date.now(),
		delisted: options.delist
	};

	if (options.initialRegistration == true) {
		fileContent.created = fileContent.updated;
	}

	if (typeof options.universeId == 'string') {
		fileContent.universeId = options.universeId;
	}

	if (typeof placeId == 'string') {
		return await updateFile(
			`worlds/${placeId}.json`,
			fileContent,
			`${(options.initialRegistration && 'Register') || (options.delist && 'Delist') || 'Update'} world ${placeId}`
		);
	}
}

export function placePassesChecks(
	placeId: string,
	universeDetails: {
		rootPlaceId: string;
		price: number | null;
	}
) {
	return (
		universeDetails != null &&
		universeDetails?.rootPlaceId.toString() === placeId &&
		typeof universeDetails?.price != 'number'
	);
}

export async function isPlaceRegistered(placeId: string) {
	const fileContent = await getFileContent(`worlds/${placeId}.json`);

	return fileContent != null;
}

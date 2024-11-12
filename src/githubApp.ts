import { env } from '$env/dynamic/private';
import { App } from 'octokit';

type WorldFileContent = {
	created?: number;
	updated: number;
	delisted?: boolean;
	universeId: string;
	forceDelisted?: boolean;
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
		const decodedExistingContent = atob(existingContent || '');
		const existingContentObject = decodedExistingContent ? JSON.parse(decodedExistingContent) : {};
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

			const acceptableStatusCodes = [200, 201];
			if (acceptableStatusCodes.includes(response.status)) {
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
		delist?: boolean;
		universeId?: string;
		unpublish?: boolean;
		forceDelist?: boolean;
	}
) {
	const fileContent: WorldFileContent = {
		updated: Date.now(),
		delisted: options.unpublish || options.delist,
		forceDelisted: options.forceDelist
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
			`${(options.initialRegistration && 'Register') || (options.unpublish && 'Unpublish') || (options.delist && 'Delist') || 'Update'} world ${placeId}`
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
	const checks = {
		fetchFailed: universeDetails != null,
		isRootPlace: universeDetails?.rootPlaceId.toString() === placeId,
		isFree: typeof universeDetails?.price != 'number'
	};
	let checksPassed = true;

	for (const [, passed] of Object.entries(checks)) {
		if (passed == false) {
			checksPassed = false;
		}
	}

	return {
		passed: checksPassed,
		checks: checks
	};
}

export async function isPlaceRegistered(placeId: string) {
	const fileContent = await getFileContent(`worlds/${placeId}.json`);

	return fileContent != null;
}

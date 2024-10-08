import { env } from '$env/dynamic/private';
import { App } from 'octokit';

const OWNER = 'RoRooms';
const REPO = 'Worlds';

const app = new App({
	appId: env.GITHUB_APP_ID,
	privateKey: env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
});

const octokit = await app.getInstallationOctokit(55535552);

console.log(`GitHub app authenticated as.`);

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

async function updateFile(path: string, content: string, message: string) {
	if (typeof path == 'string') {
		const fileContent = await getFileContent(path);

		const existingContent = (fileContent?.data?.content || '').replace(/[\r\n]+/g, ' ');

		const newContent = new TextEncoder().encode(content);
		const newContent = Buffer.from(content).toString('base64');

		if (atob(existingContent) !== atob(newContent)) {
			const response = await octokit.rest.repos.createOrUpdateFileContents({
				owner: OWNER,
				repo: REPO,
				path: path,
				message: message,
				content: newContent,
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

async function registerPlace(placeId: string) {
	if (typeof placeId == 'string') {
		return await updateFile(
			`worlds/${placeId}.json`,
			JSON.stringify({}),
			`Register place ${placeId}`
		);
	}
}

export { registerPlace };

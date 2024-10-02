import { env } from '$env/dynamic/private';
import { App } from 'octokit';

const app = new App({
	appId: env.GITHUB_APP_ID,
	privateKey: env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n')
});

const octokit = await app.getInstallationOctokit(55535552);

const { data } = await app.octokit.request('/app');

console.log(`GitHub app authenticated as: ${data?.slug}`);

async function registerPlace(placeId: string) {
	if (typeof placeId == 'string') {
		octokit.rest.repos.createOrUpdateFileContents({
			owner: 'RoRooms',
			repo: 'Worlds',
			path: `${placeId}.json`,
			message: `Register place ${placeId}`,
			content: btoa(
				JSON.stringify({
					deregistered: false
				})
			),
			committer: {
				name: 'Publishing Bot',
				email: 'noreply@rorooms.com'
			},
			author: {
				name: 'Publishing Bot',
				email: 'noreply@rorooms.com'
			}
		});
	}
}

export { registerPlace };

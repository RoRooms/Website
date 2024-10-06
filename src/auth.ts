import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Roblox, { type RobloxProfile } from '@auth/sveltekit/providers/roblox';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			robloxProfile: RobloxProfile;
		} & DefaultSession['user'];
	}
}

export const { handle, signIn } = SvelteKitAuth({
	providers: [Roblox],
	trustHost: true,
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && account.provider == 'roblox' && profile && token) {
				token.robloxProfile = profile;
			}

			return token;
		},
		async session({ session, token }) {
			if (token && session && session.user && token.robloxProfile) {
				session.user.robloxProfile = token.robloxProfile;
			}

			return session;
		}
	}
});

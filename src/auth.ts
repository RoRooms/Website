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
	callbacks: {
		async jwt({ token, account, profile }) {
			try {
				if (account?.provider === 'roblox' && profile) {
					token.robloxProfile = profile;
				}
			} catch (error) {
				console.error('Error in JWT callback:', error);
			}

			return token;
		},
		async session({ session, token }) {
			try {
				if (token && session) {
					session.user = session.user || {}; // Ensure session.user is initialized
					if (token.robloxProfile) {
						session.user.robloxProfile = token.robloxProfile;
					}
				}
			} catch (error) {
				console.error('Error in session callback:', error);
			}

			return session;
		}
	}
});

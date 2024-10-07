import { signIn } from '../../../auth';
import type { Actions } from '@sveltejs/kit';

export const actions = { default: signIn } satisfies Actions;

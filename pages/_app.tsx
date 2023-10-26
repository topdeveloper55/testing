import type { AppType } from 'next/app';
import { trpc } from '@/lib/trpc';
import '@/styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);

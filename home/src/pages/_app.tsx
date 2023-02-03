import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

const page = import('../views/_app');
const AppPage = dynamic(() => import('../views/_app'));

const Page = (props: AppProps) => {
  return <AppPage {...props} />;
};

export default Page;

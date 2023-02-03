import dynamic from 'next/dynamic';

const Page = dynamic(() => import('chat/pages/index'), { ssr: false });

export default Page;

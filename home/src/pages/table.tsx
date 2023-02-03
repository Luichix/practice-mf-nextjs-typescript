import dynamic from 'next/dynamic';

const Page = dynamic(() => import('chat/pages/table'), { ssr: false });

export default Page;

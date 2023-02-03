import dynamic from 'next/dynamic';

const page = import('../views/index');

const Page = dynamic(() => import('../views/index'), { suspense: true });

export default Page;

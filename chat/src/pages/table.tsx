import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('home/navbar'));
const Footer = dynamic(() => import('home/footer'));

export default function Home() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <h1> This the page Table in Chat App port: 3002</h1>
      <span>Test Micro - Frontend</span>
      <Footer />
    </main>
  );
}

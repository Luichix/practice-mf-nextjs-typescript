import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">Home</Link>
        <Link href="/chat">Chat</Link>
        <Link href="/table">Table</Link>
        <Link href="/tree">Tree</Link>
      </li>
    </ul>
    <style jsx>{`
      nav {
        text-align: center;
        width: 100%;
        height: 100px;
        background-color: #222;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
        gap: 2rem;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
        padding-right: 10px;
      }
    `}</style>
  </nav>
);

export default Navbar;

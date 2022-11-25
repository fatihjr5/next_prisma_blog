import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  let navs = (
    <div className="border-b border-gray-200 py-6 px-10 lg:px-20 flex items-center justify-between">  
        <h1>hello</h1>
      <section className="flex items-center gap-x-4">
        <Link href="/" className={router.pathname == "/" ? "text-indigo-500 font-semibold" : "text-blue-500"}>
          Beranda
        </Link>
        <Link href="/blog" className={router.pathname == "/blog" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Blog saya
        </Link>
        <Link href="/blog" className={router.pathname == "/blog" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Login
        </Link>
      </section>
    </div>
  )
  if(status === 'loading') {
    navs = (
      <div className="border-b border-gray-200 py-6 px-10 lg:px-20 flex items-center justify-between">  
        <h1>hello</h1>
      <section className="flex items-center gap-x-4">
        <Link href="/" className={router.pathname == "/" ? "text-indigo-500 font-semibold" : "text-blue-500"}>
          Beranda
        </Link>
        <Link href="/blog" className={router.pathname == "/blog" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Blog saya
        </Link>
        <p>validating</p>
      </section>
    </div>
    ) 
  }
  if(!session) {
    navs = (
      <div className="border-b border-gray-200 py-6 px-10 lg:px-20 flex items-center justify-between">  
        <h1>hello</h1>
      <section className="flex items-center gap-x-4">
        <Link href="/" className={router.pathname == "/" ? "text-indigo-500 font-semibold" : "text-blue-500"}>
          Beranda
        </Link>
        <Link href="/blog" className={router.pathname == "/blog" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Blog saya
        </Link>
        <Link href="/api/auth/signin" className={router.pathname == "/signin" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Log in
        </Link>
      </section>
    </div>
    )
  }
  if(session) {
    navs = (
      <div className="border-b border-gray-200 py-6 px-10 lg:px-20 flex items-center justify-between">  
        <h1>hello</h1>
      <section className="flex items-center gap-x-4">
        <Link href="/" className={router.pathname == "/" ? "text-indigo-500 font-semibold" : "text-blue-500"}>
          Beranda
        </Link>
        <Link href="/drafts" className={router.pathname == "/blog" ? "text-indigo-500 font-semibold" : "text-gray-400"}>
          Draft
        </Link>
        <Link href="/create">Create</Link>
        <label className="">{session.user?.name}</label>
        <button onClick={()=> signOut()}>Sign out</button>
      </section>
    </div>
    )
  }
  return (
    <div>
      {navs}
    </div>
  );
};

export default Header;

function isActive(arg0: string) {
  throw new Error("Function not implemented.");
}

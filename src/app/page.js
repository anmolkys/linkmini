import Link from 'next/link';
<link rel="icon" href="/favicon.ico" sizes="any" />
export default function Home() {
  return (
    <div>
      <h1>Welcome to the Link Shortener</h1>
      <Link href="/">Home</Link>
    </div>
  );
}

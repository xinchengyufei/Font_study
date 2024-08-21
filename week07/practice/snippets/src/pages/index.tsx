import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="container w-2/4 mx-auto my-0 ">
        <div className="flex justify-between items-center my-3">
          <h1 className='text-2xl font-bold'>Snippets</h1>
          <Link href={`/snippets/new`} className='rounded-sm border border-slate-300 py-1 px-2'>New</Link>
        </div>
        <ul>

        </ul>
      </div>
    </main>
  );
}

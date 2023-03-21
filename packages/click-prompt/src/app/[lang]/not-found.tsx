/// https://stackoverflow.com/a/75625136

import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center min-h-[50vh] justify-around'>
      <h1 className='text-6xl text-red-600'>nOT foUnD – 404!</h1>
      <div>
        <Link className='text-xl underline underline-offset-4 hover:text-neutral-400' href='/'>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

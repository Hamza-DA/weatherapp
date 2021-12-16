import { SearchIcon, CloudIcon, HomeIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const location = useRouter().pathname;
  return (
    <>
      <header className='w-full px-6'>
        <nav className='flex items-center justify-between w-full py-6'>
          <div className='flex items-center text-white'>
            <CloudIcon className='h-6 w-6 stroke-current' />{' '}
            <p className='font-medium text-base ml-2'>Weather app</p>
          </div>
          {location === '/' ? (
            <Link href='/search'>
              <span className='flex items-center text-white cursor-pointer'>
                <p className='mr-2'>Search</p>
                <SearchIcon className='h-6 w-6 stroke-current' />
              </span>
            </Link>
          ) : (
            <Link href='/'>
              <span className='flex items-center text-white cursor-pointer'>
                <p className='mr-2'>Home</p>
                <HomeIcon className='h-6 w-6 stroke-current' />
              </span>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}

import { CloudIcon } from '@heroicons/react/outline';
export default function Loader() {
  return (
    <div className='flex items-center text-white'>
      <CloudIcon className='h-8 w-8 stroke-current animate-bounce' />
      <p className='font-medium text-xl ml-2'>Loading</p>
    </div>
  );
}

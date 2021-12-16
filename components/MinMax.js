import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
export const MinMax = ({ min, max }) => {
  return (
    <>
      <div className='flex flex-row items-center'>
        <span className='flex items-center mr-3'>
          <ChevronUpIcon className='h-4 w-4 mr-1' />{' '}
          <p className='text-lg font-medium '>{Math.floor(max)}</p>
        </span>
        <span className='flex items-center opacity-70'>
          <ChevronDownIcon className='h-4 w-4 mr-1' />{' '}
          <p className='text-lg font-medium '>{Math.floor(min)}</p>
        </span>
      </div>
    </>
  );
};

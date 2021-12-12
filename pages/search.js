import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import axios from 'axios';
export default function Search() {
  const [SearchTerm, setSearchTerm] = useState('');
  const [SearchRes, setSearchRes] = useState([]);
  const getRes = (prop) => {
    if (prop !== '') {
      axios
        .get(`http://localhost:3000/api/search.json?q=${prop}`)
        .then((res) => {
          console.log(res);
          setSearchRes(res.data);
        })
        .catch((err) => console.log(err));
    }
    // const api = await fetch(`http://localhost:3000/api/search.json?q=kenitra`);
    // const res = await api.json();

    // console.log(res);
  };

  // const SearchRes = async (props) => {
  //   const citiesArr = await props;
  //   // console.log(citiesArr);
  //   // citiesArr?.map((e, i) => (
  //   //   <>
  //   //     <div className='bg-white-rounded'>
  //   //       <h2>{e.name}</h2>
  //   //     </div>
  //   //   </>
  //   // ));
  //   return <h1>a</h1>;
  // };
  return (
    <>
      <div className='px-6 h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white'>
        <label
          htmlFor='search'
          className='flex items-center py-3 px-5 mb-6 bg-white bg-opacity-20  rounded-2xl'
        >
          <SearchIcon className='h-6 w-6 mr-4' />
          <input
            onInput={({ target }) => {
              setSearchTerm(target.value);
              getRes(target.value);
            }}
            value={SearchTerm}
            type='text'
            name='search'
            placeholder='Search for a city ...'
            className='bg-transparent border-none outline-none text-xl w-full placeholder:text-opacity-40 placeholder:text-white'
          />
        </label>
        <div className=''>
          {SearchRes?.slice(0, 3).map((e, i) => (
            <>
              <div className='bg-white-rounded py-3 px-5 mb-4'>
                <h2 className='text-xl tracking-normal opacity-90 font-normal'>
                  {e.name}
                </h2>
                <div className=''></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

import { SearchIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { MinMax } from '../components/MinMax';
import { KelvinToCelcius } from '../components/ConvertTool';
export default function Search() {
  const [SearchTerm, setSearchTerm] = useState('');
  const [onCallRes, setonCallRes] = useState([]);
  const [SearchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    localStorage.getItem('searchHistory') !== null && onCall();
  }, []);

  const getRes = (prop) => {
    if (prop !== '') {
      axios
        .get(
          `${
            typeof window !== 'undefined' && window.location.origin
          }/api/weather?q=${prop}`
        )
        .then((res) => {
          if (res.data.cod == 404) {
            alert('City not found');
          } else {
            saveToLocal([res.data.coord, res.data.name, res.data.sys.country]);
            onCall([res.data.coord, res.data.name, res.data.sys.country]);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const saveToLocal = (props) => {
    // console.log(
    //   JSON.parse(localStorage.getItem('searchHistory'))?.filter(
    //     (e) => e[1] !== props[1]
    //   )
    // );
    const cities = [...(SearchHistory || ''), props];
    setSearchHistory(cities);
    localStorage.setItem('searchHistory', JSON.stringify(cities));
  };
  const onCall = () => {
    JSON.parse(localStorage.getItem('searchHistory')).map((e, i) => {
      axios
        .get(
          `${
            typeof window !== 'undefined' && window.location.origin
          }/api/onecall?lat=${e[0].lat}&lon=${e[0].lon}&units=metric`
        )
        .then((res) => {
          setonCallRes([...onCallRes, [...e, res.data]]);
        })
        .catch((err) => alert(err));
    });
  };

  return (
    <>
      <NavBar />
      <div className='px-6 text-white'>
        <div className='flex items-center mb-6'>
          <label
            htmlFor='search'
            className='flex items-center w-full py-3 px-5 bg-white bg-opacity-20  rounded-2xl'
          >
            <input
              onInput={({ target }) => {
                setSearchTerm(target.value);
              }}
              value={SearchTerm}
              type='text'
              name='search'
              placeholder='Search for a city ...'
              className='bg-transparent border-none outline-none text-xl w-full placeholder:text-opacity-40 placeholder:text-white'
            />
          </label>
          <button className='py-3 px-5 bg-white bg-opacity-20 rounded-2xl ml-4'>
            <SearchIcon
              onClick={() => {
                getRes(SearchTerm);
              }}
              className='h-6 w-6'
            />
          </button>
        </div>
        {onCallRes.map((e, i) => (
          <div
            key={i}
            className='bg-white bg-opacity-10 rounded-2xl py-3 px-5 mb-4'
          >
            <div className='flex items-start'>
              <h2 className='text-8xl tracking-normal font-thin degree mr-12 relative'>
                {Math.floor(e[3].current.temp)}
              </h2>
              <div className='flex flex-col items-start mt-2.5'>
                <div className='flex -mb-1'>
                  <p className='text-2xl mr-2'>
                    {e[3].current.weather[0].main}
                  </p>
                  <img
                    className='w-8 h-8'
                    src={`http://openweathermap.org/img/wn/${e[3].current.weather[0].icon}.png`}
                  />
                </div>
                <span className='text-base opacity-50 font-normal'>{e[1]}</span>
                <MinMax
                  min={e[3].daily[0].temp.min}
                  max={e[3].daily[0].temp.max}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

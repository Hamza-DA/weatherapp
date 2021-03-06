import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { ArrowUpIcon, RefreshIcon } from '@heroicons/react/outline';
import { CurrentWeather } from '../components/CurrentWeather';
import { UnixDate } from '../components/ConvertTool';
import { MinMax } from '../components/MinMax';
import { HourlyForecast, DailyForecast } from '../components/Forecast';
import Loader from '../components/Loader';
export default function Home() {
  const [Res, setRes] = useState(null);
  const [ErrorObj, setErrorObj] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getRes({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setErrorObj(err);
      },
      { timeout: 10000 }
    );
  }, []);
  const Error = () => {
    let error = '';
    switch (ErrorObj.code) {
      case 1:
        error = 'Please make sure you allow GPS permission and try again.';
        break;
      case 2:
        error =
          'Position unavailable, try again or manually search for you city.';
        break;
      case 3:
        error =
          'Timeout, maybe the server took a long time to respond, please try again.';
        break;

      default:
        break;
    }
    return (
      <>
        <div className='flex flex-col items-center text-white'>
          <p className='font-medium text-xl ml-2 w-2/3 text-center mb-6'>
            {error}
          </p>
          <button
            className='flex items-center bg-white bg-opacity-10 px-3 py-2 rounded-md'
            onClick={() => window.location.reload()}
          >
            <p className='mr-2'>Refresh</p>
            <RefreshIcon className='h-6 w-6 stroke-current' />
          </button>
        </div>
      </>
    );
  };
  const getRes = ({ lat, lon }) => {
    axios
      .get(
        `${
          typeof window !== 'undefined' && window.location.origin
        }/api/onecall?lat=${lat}&lon=${lon}&units=metric`
      )
      .then((res) => {
        // console.log(res);
        setRes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const AdditionalInfo = ({ prop }) => {
    return (
      <>
        <div className='bg-white bg-opacity-5 w-full p-8 grid grid-cols-2 gap-y-8'>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Sunset</p>
            <h6 className='text-xl font-semibold mr-2'>
              <UnixDate time={prop.sunset} />
            </h6>
          </div>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Sunrise</p>
            <h6 className='text-xl font-semibold mr-2'>
              <UnixDate time={prop.sunrise} />
            </h6>
          </div>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Wind speed</p>
            <div className='flex items-center'>
              <h6 className='text-xl font-semibold mr-2'>
                {Math.floor(prop.wind_speed * 3.6)}km/h
              </h6>
              <span>
                <ArrowUpIcon
                  className='h-4 w-4'
                  style={{ transform: `rotate(${prop.wind_deg}deg)` }}
                />
              </span>
            </div>
          </div>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Humidity</p>
            <h6 className='text-xl font-semibold mr-2'>{prop.humidity}%</h6>
          </div>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Pressure</p>
            <h6 className='text-xl font-semibold mr-2'>{prop.pressure}hPa</h6>
          </div>
          <div className=''>
            <p className='text-lg opacity-80 mb-2'>Feels like</p>
            <h6 className='text-xl font-semibold mr-2 degree'>
              {/* <KelvinToCelcius k={prop.feels_like} /> */}
              {Math.floor(prop.feels_like)}
            </h6>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {Res !== null ? (
        <>
          <NavBar />

          <div className=' text-white'>
            <main className='relative flex-col flex items-center'>
              <div className='mt-4 flex flex-col items-center'>
                <CurrentWeather
                  icon={Res.current.weather[0].icon}
                  descrition={Res.current.weather[0].description}
                  temp={Res.current.temp}
                />
                <MinMax
                  min={Res.daily[0].temp.min}
                  max={Res.daily[0].temp.max}
                />
              </div>
              <div className='px-8 w-full'>
                <HourlyForecast arr={Res.hourly} />
                <DailyForecast arr={Res.daily} />
              </div>
              <AdditionalInfo prop={Res.current} />
            </main>
          </div>
        </>
      ) : (
        <>
          <main className='relative w-full h-screen flex items-center justify-center'>
            {ErrorObj == null ? <Loader /> : <Error />}
          </main>
        </>
      )}
    </>
  );
}

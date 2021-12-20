import {
  KelvinToCelcius,
  UnixHours,
  UnixDays,
  UnixDate,
} from '../components/ConvertTool';
import { MinMax } from './MinMax';
export const HourlyForecast = ({ arr }) => {
  return (
    <>
      <div className='mt-16 flex w-full flex-col overflow-auto before:h-px before:w-full before:bg-white before:bg-opacity-25 after:h-px after:w-full after:bg-white after:bg-opacity-25'>
        <div className='w-full flex flex-row overflow-auto items-center '>
          <div className='w-full flex flex-row items-center justify-around my-3'>
            {arr.slice(1, 6).map((e, i) => (
              <div key={i} className='mx-2 flex flex-col items-center'>
                <p className='opacity-70 mb-2'>
                  <UnixHours time={e.dt} />
                </p>
                <h6 className='text-xl degree relative'>
                  {/* <KelvinToCelcius k={e.temp} /> */}
                  {Math.floor(e.temp)}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  // return <></>;
};
export const DailyForecast = ({ arr }) => {
  return (
    <>
      <div className='mt-16 w-full'>
        {arr.slice(0, 7).map((e, i) => (
          <div
            key={i}
            className='w-full flex items-center justify-between mb-8 relative'
          >
            <h6 className='text-xl'>
              <UnixDays time={e.dt} />
            </h6>
            <div className='flex flex-row items-center w-20 absolute left-1/2 -translate-x-1/2'>
              <p className='font-regular opacity-70 text-lg'>
                {e.weather[0].main}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${e.weather[0].icon}.png`}
                alt='image'
                className='w-8 h-auto'
              />
            </div>
            <MinMax min={e.temp.min} max={e.temp.max} />
          </div>
        ))}
      </div>
    </>
  );
};

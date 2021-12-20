import { KelvinToCelcius } from './ConvertTool';
export const CurrentWeather = ({ descrition, temp, icon }) => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='font-thin text-9xl after:content-["°"] after:absolute'>
          {Math.floor(temp)}
          {/* <KelvinToCelcius k={temp} /> */}
        </h1>
        <div className='flex flex-row items-center'>
          <p className='font-medium text-xl capitalize'>{descrition}</p>
          <img
            src={`https://openweathermap.org/img/wn/${icon}.png`}
            alt='image'
            className='w-10 h-auto'
          />
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import axios from "axios";
import request from "../pages/api/Request_Api";
import Image from 'next/image';

export const HeaderMovie = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(request.requestPopular).then((response) => (
      setMovies(response.data.results)
    ));
  }, []);

  let backdrop_path = movie?.backdrop_path;
  let original_title = movie?.original_title;
  let overview = movie?.overview;

  const Loader = ({ }) => {
    return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  }

  return (
    <div className="relative">
      <div className="h-[100vh]">
        <Image className=" " loader={Loader} layout="fill" objectFit="cover" src={'https://image.tmdb.org/t/p/original/' + backdrop_path} alt="" />
      </div>
      <div className="absolute bottom-[19rem] left-[3.4rem] ]">
        <div className=" grid grid-cols-1">
          <label className="text-white text-[4rem] w-[36rem] drop-shadow-lg font-bold leading-[4.5rem] mb-[1rem] shadow-black" htmlFor="">{original_title}</label>
          <label className="text-white text-xl w-[36rem] mb-[2rem] drop-shadow-lg shadow-black hidden " htmlFor=" ">{overview}</label>
          <span>
            <button className="text-xl font-bold rounded bg-white hover:bg-white/70 text-black px-10 py-2 mr-4"> <i className="fa-solid fa-play"></i> Play</button>
            <button className="text-xl font-bold rounded bg-moreinfobtn/80 hover:bg-moreinfobtn/60 text-white px-7 py-2 mr-4 "><i className="fa-solid fa-circle-info"></i> More Info</button>
          </span>
        </div>
      </div>
      <div className="h-[170px] w-full absolute bottom-0 bg-gradient-to-t from-homebackground  ">
        <div className='h-full w-full bg-gradient-to-t from-homebackground'></div>
      </div>
      <div className="h-[190px]  w-full absolute bottom-0 ">
        <MovieRow rowID="1" title="Upcoming Movies" fetchURL={request.requestUpcomingMovies} />
      </div>
    </div>
  );
}

const MovieContainer = ({ item }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  const Loader = () => {
    let item_path = item?.backdrop_path;
    return `https://image.tmdb.org/t/p/original/${item_path}`;
  }

  return (
    <>
      <div onClick={toggleModal} className=" w-[228px] mx-[3.5px] h-[128px] inline-block cursor-pointer relative rounded overflow-hidden">
        <div className='h-[200px] w-[200px] '>
          <Image className=" " loader={Loader} layout="fill" src={'https://image.tmdb.org/t/p/w500/' + item?.backdrop_path} alt="" />
        </div>
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100'>
          <p className='m-2 text-white'>{item?.title}</p>
        </div>
      </div>

      {modal && (   
        <div className=" w-screen h-screen fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-20">
          <div className=' z-20 mt-[30px]  h-[43rem] w-[53rem] overflow-hidden rounded-md bg-moviecontainerhover absolute'>
            <div className='h-[30rem]  '>
              <i onClick={toggleModal} className="fa-solid fa-x text-white text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%] absolute right-8 top-6 hover:bg-black/50"></i>
              <div className=" w-[53rem] bg-red-400">
                <Image loader={Loader} width={1000} height={0} src={'https://image.tmdb.org/t/p/w500/' + item?.backdrop_path} />
              </div>
              <div className='text-white h-[110px] w-full block absolute bottom-[208px] bg-gradient-to-t from-moviecontainerhover '></div>
              <div className='ml-[3rem] text-white font-bold text-[45px] h-[110px] w-[500px] block absolute bottom-[290px]'>
                {item?.title}
              </div>
              <div className='text-white h-[110px] w-full block absolute bottom-[208px] bg-gradient-to-t from-moviecontainerhover '>
                <button className=" text-xl rounded bg-white text-black px-[36px] py-2 ml-12"> <i className="fa-solid fa-play"></i>Play</button>
                <button className='ml-[10px]'><i className="fa-solid fa-plus border-[2px] border-gray-300 text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%]"></i></button>
                <button className='ml-[10px]'><i className="fa-solid fa-thumbs-up border-[2px] border-gray-300 text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%]"></i></button>
              </div>
            </div>
            <div className='grid grid-cols-3 py-[24px] px-[48px] '>
              <div className='col-span-2   pr-[28px]'>
                <ul className='flex flex-row justify-start pb-[.8rem]'>
                  <li className='rating text-green-400  '> 97% Match </li>
                  <li className='age text-white  ml-[.5rem] border-2 px-1 text-sm'> 18+ </li>
                  <li className='length text-white  ml-[.5rem]'> 3 Seasons</li>
                  <li className='hd text-white ml-[.5rem] border-2 px-1  text-xs'> HD </li>
                </ul>
                <span className='text-white col-span-2 static w-full h-[80%] bg-red-200 overflow-hidden'>
                  <p className='whitespace-normal overflow-hidden text-ellipsis line-clamp-3'>
                    {item?.overview}
                  </p>
                </span>
              </div>
              <div className='col-span-1 mr-[0px]'>
                <ul>
                  <li className='text-navtexthover text-sm pb-[.8rem]'>Release Date: <span className='text-white'>{item?.release_date}</span></li>
                  <li className='text-navtexthover text-sm pb-[.8rem]'>Genre: <span className='text-white'>{item?.genre_ids}</span></li>
                  <li className='text-navtexthover text-sm pb-[.8rem]'>Vote Count: <span className='text-white'>{item?.vote_count}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div onClick={toggleModal} className=' w-full h-full bg-black/40'></div>
        </div>
      )}
    </>
  );
}

export const MovieRow = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => (
      setMovies(response.data.results)
    ));
  }, [fetchURL]);
  console.log(movies)

  const sliderLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const sliderRight = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div className='w-screen'>
      <label htmlFor="" className='mx-[3.5px] px-[3.4rem] text-white text-[1.4rem]   font-bold   '>{title}</label><br />

      <div className='relative flex items-center group w-screen'>
        <i onClick={sliderLeft} className=" z-30 fa-solid fa-chevron-left absolute left-0 text-white  ml-[0rem]  text-[2rem] bg-black/60 py-[3.2rem] px-[1rem] opacity-0 hover:opacity-100 hidden group-hover:block"></i>
        <div id={'slider' + rowID} className=' px-[3.4rem] w-screen   h-full overflow-x-scroll scrollbar-hide scroll whitespace-nowrap scroll-smooth  relative'>
          {movies.map((item, id) => (
            <MovieContainer item={item} index={id} key={id} />
          ))}
        </div>
        <i onClick={sliderRight} className=" z-30 fa-solid fa-chevron-right absolute right-0 text-white mr-[1.2rem]  text-[2rem] bg-black/60 py-[3.2rem] px-[1rem] opacity-0 hover:opacity-100 hidden group-hover:block"></i>
      </div>
    </div>
  );
}

export const HomeRows = () => {
  return (
    <div className=' bg-homebackground h-full  '>
      <div className=''>
        <div className='grid gap-y-[2.5rem]  pb-[8.1rem] pt-[1.4rem]'>
          <MovieRow rowID="2" title="Top Rated Movies" fetchURL={request.requestTopRatedMovies} />
          <MovieRow rowID="3" title="Shows on Air" fetchURL={request.requestTvAiringToday} />
          <MovieRow rowID="4" title="Top Rated Shows" fetchURL={request.requestTopRatedTv} />
        </div>
      </div>
    </div>
  );
}

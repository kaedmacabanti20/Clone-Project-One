import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import request from "../pages/api/Request_Api";
import Image from 'next/image';
 
 
export const HeaderMovieChoices = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(request.requestPopular).then((response) => setMovies(shuffleArray(response.data.results)));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const Loader = ({ src }) => {
    return `https://image.tmdb.org/t/p/original/${src}`;
  };

  return (
    <div className="h-[34rem] pt-[6.2rem] mb-[3rem] mx-[3.8rem] grid grid-cols-2 gap-2">
      <div className="cont1 h-full bg-black grid grid-cols-1 grid-rows-3 gap-2">
        <div className="grid grid-cols-1 row-span-2 relative">
          {movies.length > 0 && (
            <Image
              loader={Loader}
              src={movies[0]?.backdrop_path}
              layout="fill"
              objectFit="cover"
              alt={movies[0]?.original_title}
              className="col-span-2"
            />
          )}
        </div>
        <div className="grid grid-cols-2 relative">
          {movies.length > 1 && (
            <>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[1]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[1]?.original_title}
                  className="h-full"
                />
              </div>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[2]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[2]?.original_title}
                  className="h-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="cont2 h-full bg-black grid grid-cols-1 grid-rows-3 gap-2">
        <div className="grid grid-cols-2 row-span-2 relative">
          {movies.length > 3 && (
            <>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[3]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[3]?.original_title}
                  className="col-span-1"
                />
              </div>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[4]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[4]?.original_title}
                  className="col-span-1"
                />
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 relative">
          {movies.length > 5 && (
            <>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[5]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[5]?.original_title}
                  className="h-full"
                />
              </div>
              <div className="relative">
                <Image
                  loader={Loader}
                  src={movies[6]?.backdrop_path}
                  layout="fill"
                  objectFit="cover"
                  alt={movies[6]?.original_title}
                  className="h-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


const MovieContainer = ({item}) => {
  const [modal, setModal] = useState(false)

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
        < >  
          <div onClick={toggleModal}   className=" w-[228px] mx-[3.5px] h-[128px] inline-block cursor-pointer relative rounded overflow-hidden">
            <div className='h-[200px] w-[200px] '>
              <Image className=" " loader={Loader} layout="fill" src={'https://image.tmdb.org/t/p/w500/'+item?.backdrop_path}    alt="" />
            </div>
             <div className='absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100'>
              <p className='m-2 text-white'>{item?.title}</p>
            </div>
          </div> 
      
          {modal && (
            <div  className=" w-screen h-screen fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-20     ">
              <div className=' z-20 mt-[30px]  h-[43rem] w-[53rem] overflow-hidden rounded-md bg-moviecontainerhover absolute'>
                <div className='h-[30rem]  '>
                  <i onClick={toggleModal}  class="fa-solid fa-x text-white text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%] absolute right-8 top-6 hover:bg-black/50"></i>
                   <div className=" w-[53rem] bg-red-400">
                       <Image loader={Loader} width={1000} height={0} src={'https://image.tmdb.org/t/p/w500/'+item?.backdrop_path}  />
                    </div>
                   <div className='text-white h-[110px] w-full block absolute bottom-[208px] bg-gradient-to-t from-moviecontainerhover '></div>
                  <div className='ml-[3rem] text-white font-bold text-[45px] h-[110px] w-[500px] block absolute bottom-[290px]'>
                    {item?.title}
                  </div>
                  <div className='text-white h-[110px] w-full block absolute bottom-[208px] bg-gradient-to-t from-moviecontainerhover '>
                      <button className=" text-xl rounded bg-white text-black px-[36px] py-2 ml-12"> <i class="fa-solid fa-play"></i>Play</button>
                      <button className='ml-[10px]'><i class="fa-solid fa-plus border-[2px] border-gray-300 text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%]"></i></button>
                      <button className='ml-[10px]'><i class="fa-solid fa-thumbs-up border-[2px] border-gray-300 text-[20px] bg-black/25 px-[14px] py-[12px] rounded-[50%]"></i></button>
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
                      <span className='text-white col-span-2 static w-[20px] whitespace-normal h-20 '>{item?.overview}</span>
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
              <div  onClick={toggleModal}  className=' w-full h-full bg-black/40'>
              </div>
          </div>
          )}
      </ >
  )
}

export const MovieRow= ({title,fetchURL, rowID}) => {
    const [movies, setMovies] = useState([])

    useEffect(()=> {
      axios.get(fetchURL).then((response)=>(
        setMovies(response.data.results)
      ))
    },[fetchURL]) 
    console.log(movies)


    const sliderLeft = () => {
      var slider = document.getElementById('slider' +rowID);
      slider.scrollLeft = slider.scrollLeft - 500;
    }
    const sliderRight = () => {
      var slider = document.getElementById('slider'+rowID);
      slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
      <div className='w-screen'>
            <label htmlFor="" className='mx-[3.5px] px-[3.4rem] text-white text-[1.4rem]   font-bold   '>{title}</label><br /> 

        <div className='relative flex items-center group w-screen'>
              <i onClick={sliderLeft} class=" z-30 fa-solid fa-chevron-left absolute left-0 text-white  ml-[0rem]  text-[2rem] bg-black/60 py-[3.2rem] px-[1rem] opacity-0 hover:opacity-100 hidden group-hover:block"></i>
          <div id={'slider'+ rowID} className=' px-[3.4rem] w-screen   h-full overflow-x-scroll scrollbar-hide scroll whitespace-nowrap scroll-smooth  relative'>
            {movies.map((item, id)=>(
              <MovieContainer item={item} index={id} key={id}/>
            ))}
        
          </div> 
                <i onClick={sliderRight} class=" z-30 fa-solid fa-chevron-right absolute right-0 text-white mr-[1.2rem]  text-[2rem] bg-black/60 py-[3.2rem] px-[1rem] opacity-0 hover:opacity-100 hidden group-hover:block"></i>
          </div>
        
      </div>
    )

}
 
export const MoviesRows = () => {

  return (
    <div className=' bg-homebackground h-full  '>

        <div className=''>
          <div className='grid gap-y-[2.5rem]  pb-[8.1rem] pt-[1.4rem]'>
            <MovieRow rowID="2" title="Upcoming" fetchURL={request.requestUpcoming} />
            <MovieRow rowID="2" title="Popular" fetchURL={request.requestPopular} />
            <MovieRow rowID="3" title="Top Rated" fetchURL={request.requestTopRated} />
            <MovieRow rowID="4" title="Now Playing" fetchURL={request.requestNowPlaying} />
          </div>
        </div>
      
    </div>
  )
}

 




  
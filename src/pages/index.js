import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {

  const router = useRouter()

  const handleSelection = () => {
    router.push('/browse')
  }

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-black lg:px-0 px-4 lg:gap-10 gap-6 lg:py-0 py-10'>

      <h1 className='lg:text-5xl text-3xl font-semibold text-white'>Who's Watching?</h1>

      <div className='flex items-center justify-center lg:gap-6 gap-4 flex-wrap'>

        {
          [...Array(3)].map((item, index) => (
            <div onClick={handleSelection} className='flex flex-col items-center group gap-2 select-none cursor-pointer'>

              <div className='border group-hover:border-white'>
                <img src="/icon.svg" alt="icon" className='w-32 lg:w-40 h-32 lg:h-40 invert' />
              </div>

              <h2 className='lg:text-xl text-lg font-medium text-white'>Person {index + 1}</h2>

            </div>
          ))
        }

        <div className='flex flex-col items-center group gap-2 select-none cursor-pointer'>

          <div className='group-hover:bg-slate-100'>
            <img src="/icon.svg" alt="icon" className='w-32 lg:w-40 h-32 lg:h-40 group-hover:invert-0 invert' />
          </div>

          <h2 className='lg:text-xl text-lg font-medium text-white'>Add Profile</h2>

        </div>

      </div>

      <button className='lg:w-42 w-40 outlined-button'>
        Manage Profiles
      </button>

    </div>
  )
}

export default Home
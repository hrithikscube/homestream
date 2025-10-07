import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const formatName = (str) => {
    return str.replaceAll('_', ' ').split('.')[0]
}

const Browse = () => {
    const router = useRouter()
    const [files, setFiles] = useState([])

    const handlePlayNow = (filename) => {
        router.push(`/watch/${filename}`)
    }

    const getVideoFiles = async () => {
        await fetch('http://localhost:3333/files')
            .then((response) => response.json())
            .then((data) => {
                setFiles(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getVideoFiles()
    }, [])

    return (
        <div className='flex flex-col w-full min-h-screen bg-black lg:gap-6 gap-4'>

            <div className='flex items-center justify-between w-full sticky top-0 h-16 bg-slate-600 z-[2] lg:px-10 px-4'>
                <h1 className='lg:text-xl text-lg text-white font-semibold'>HomeStream</h1>

                <button>
                    <img src="/search.svg" alt="search" className='w-6 h-6 invert' />
                </button>
            </div>

            <div className='flex flex-col z-[1] relative lg:px-10 px-4'>
                {
                    files.map((item, i) => (
                        <div className='flex lg:flex-row flex-col lg:items-start w-full lg:gap-6 gap-4 lg:py-6 py-4 border-b border-white last:border-b-0'>

                            <div onClick={() => handlePlayNow(item)} className='lg:w-3/12 w-full h-44 lg:h-48 bg-slate-200 relative flex items-center justify-center cursor-pointer select-none'>
                                <img src="/play.svg" alt="play" className='w-12 h-12' />
                            </div>

                            <div className='flex flex-col lg:gap-4 gap-2 lg:w-8/12'>

                                <h2 className='lg:text-lg text-base text-white font-semibold capitalize'>{formatName(item)}</h2>

                                <div className='flex items-center lg:gap-4 gap-2 mt-2'>

                                    <button onClick={() => handlePlayNow(item)} className='outlined-button'>
                                        Play Now
                                    </button>

                                    <button className='outlined-button'>
                                        More Info
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Browse


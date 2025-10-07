import gsap from 'gsap/dist/gsap';
import React, { useEffect } from 'react';
import { Roboto } from 'next/font/google';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-roboto',
})

const Test = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

        let ctx = gsap.context(() => {
            gsap.fromTo('.animate-text', { opacity: 0, y: '-100%' }, {
                stagger: 0.2,
                opacity: 1,
                y: 0,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.about-container',
                    start: '-30% top',
                    end: 'bottom bottom',
                    markers: true,
                    scrub: 0.2
                }
            })

            gsap.fromTo('.animate-image', { height: '0' }, {
                height: '400px',
                duration: 1,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.about-container',
                    start: '-30% top',
                    end: 'bottom bottom',
                    markers: true,
                    scrub: 0.2
                }
            })
        })

        return () => ctx.revert()

    }, [])

    return (
        <div className={`${roboto.className} flex flex-col w-full bg-[#f2f2f2]`}>


            <div className='flex flex-col items-center justify-center w-full h-screen bg-green-300'>

                <h1 className='lg:text-4xl text-2xl font-semibold text-[#121212]'>Scroll Down</h1>

            </div>

            <div className='flex flex-col bg-blue-200 w-full h-screen items-center justify-start about-container lg:p-10 p-8 lg:gap-6 gap-4'>

                <div className='overflow-hidden flex items-center'>
                    {
                        "About Me".split('').map((char, index) => (
                            <div className={`flex-shrink-0 lg:text-9xl text-2xl font-bold text-[#121212] uppercase animate-text ${char === "t" ? 'lg:pr-6 pr-4' : ''}`}>{char}</div>
                        ))
                    }
                </div>


                <div className='w-96 mx-auto bg-slate-400 animate-image'>
                    <img src="https://picsum.photos/400/400" alt='image' className='w-full h-full object-cover' />
                </div>

            </div>


        </div>
    )
}

export default Test
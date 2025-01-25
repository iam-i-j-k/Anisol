import React, { useEffect } from "react"
import { Link } from "react-router"
import { useUser,
  SignedOut,
  SignInButton,
 } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { BackgroundLines } from "../components/ui/background-lines"

const Hero = () => {

  const { isSignedIn } = useUser() // Check if the user is signed in
  const navigate = useNavigate()

  
  useEffect(() => {
  
    if(isSignedIn){
      navigate('/anisol') // Redirect to the Anisol page if the user is signed in
    }
    
  }, [])
  



  return (
    <div className="w-full h-full text-white overflow-hidden font-onest">
       <div className="relative w-screen flex flex-col items-center justify-center ">
        <BackgroundLines />
       {/* <BackgroundGradientAnimation /> */}
        <div className="absolute top-20 text-center py-10">
          <h1 className="text-4xl sm:text-5xl md:text-[12rem] font-light font-onest tracking-tight mb-4 animate-fade-in-up text-white">
           Anisol AI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 animate-fade-in-up animation-delay-200">
            Your intelligent content generation companion
          </p>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
            Anisol AI is a powerful tool that generates high-quality, tailored content based on your descriptions.
            Whether you need blog posts, product descriptions, or creative writing, Anisol AI has got you covered.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-600">
            
            { isSignedIn ? (
              <button onClick={()=>navigate('/anisol')} className="cursor-pointer bg-white text-black border-2 border-white font-semibold font-onest py-2 px-5 rounded-full">
              Get Started
            </button>
            ) : (
              <SignedOut>
              <SignInButton mode="modal">
                <button className="cursor-pointer bg-white text-black border-2 border-white font-semibold font-onest py-2 px-5 rounded-full">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            ) }
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Hero



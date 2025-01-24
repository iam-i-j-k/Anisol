import React from "react"
import { Link } from "react-router"
import { useUser,
  SignedOut,
  SignInButton,
 } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const { isSignedIn } = useUser() // Check if the user is signed in
  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (!isSignedIn) {
      // Redirect to Sign Up page if not signed in
      navigate('/sign-up')
    } else {
      // Redirect to the main page or desired functionality
      navigate('/anisol')
    }
  }



  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
      <div className="relative w-screen py-24 sm:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute -top-16 -left-16 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-float absolute top-36 -right-16 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-float-slow absolute -bottom-16 left-36 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
        <div className="relative text-center py-10">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-semibold font-onest tracking-tight mb-4 animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-indigo-400">
            Welcome to Anisol AI
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 animate-fade-in-up animation-delay-200">
            Your intelligent content generation companion
          </p>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-400">
            Anisol AI is a powerful tool that generates high-quality, tailored content based on your descriptions.
            Whether you need blog posts, product descriptions, or creative writing, Anisol AI has got you covered.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-600">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="cursor-pointer bg-transparent hover:bg-blue-600 text-white border-2 border-white font-semibold font-onest py-2 px-5 rounded-full">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero



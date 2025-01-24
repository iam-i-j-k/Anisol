import React from "react"
import { Link } from "react-router"

const Hero = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white overflow-hidden">
      <div className="relative w-screen py-24 sm:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute -top-16 -left-16 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-float absolute top-36 -right-16 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="animate-float-slow absolute -bottom-16 left-36 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        </div>
        <div className="relative text-center py-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
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
            <Link to='/anisol' className="cursor-pointer bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero



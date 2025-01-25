import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Lottie from 'lottie-react';

const Navbar = () => {
  return (
    <div className="absolute flex justify-center z-50">
      <nav className="fixed left-0 right-0 top-4 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 items-center justify-center w-[60%] rounded-full bg-white/80  backdrop-blur-3xl shadow-sm">
          <div className="flex justify-between h-14 items-center">
            <div className="flex-shrink-0 flex items-center justify-center space-x-5">
              
              <span className="text-3xl font-semibold font-onest text-black">
                Anisol AI
              </span>
            </div>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="cursor-pointer bg-black text-white font-semibold font-onest py-1 px-4 rounded">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

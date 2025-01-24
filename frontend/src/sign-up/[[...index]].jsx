import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {/* Wrapper for the SignUp component */}
      <div className="flex items-center justify-center">
        <SignUp
          appearance={{
            layout: {
              logoPlacement: 'none', // Optional: Remove logo if it's too large
            },
            elements: {
                rootBox: 'shadow-lg rounded-lg w-full max-w-md p-6 bg-white !m-auto', // Add !m-auto to enforce centering
              },              
          }}
        />
      </div>
    </div>
  )
}

export default SignUpPage

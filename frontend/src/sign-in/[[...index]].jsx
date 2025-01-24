import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
    return (
        <div className="flex h-screen items-center justify-center py-32 bg-gray-100">
            <SignIn
            appearance={{
                elements: {
                rootBox: 'shadow-lg rounded-lg mx-auto',
                },
            }}
            />
        </div>
    )
}

export default SignInPage
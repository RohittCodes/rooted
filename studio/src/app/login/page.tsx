import SignIn from "@/components/globals/sign-in";

const LoginPage = () => {
    return ( 
        <div className="h-screen flex justify-center items-center">
            <div className="w-96 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">
                    Login to your account
                </h1>
                <SignIn />
            </div>
        </div>
     );
}
 
export default LoginPage;
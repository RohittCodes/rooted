import { auth } from "@/auth";
import SignIn from "@/components/globals/sign-in";
import { SignOut } from "@/components/globals/sign-out";

export default async function Page() {
  const session = await auth();
  console.log('session', session);

  return (
    <main>
      Studio Page
      {
        session ? (
          <>
            <SignOut />
            <p>Session: {session?.user?.email}</p>
          </>
        ) : (
          <SignIn />
        )
      }
    </main>
  );
}

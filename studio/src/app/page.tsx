import { auth } from "@/auth";
import { SignOut } from "@/components/globals/sign-out";

export default async function Page() {
  const session = await auth();
  console.log('session', session);

  return (
    <main>
      Studio Page
      <SignOut />
    </main>
  );
}

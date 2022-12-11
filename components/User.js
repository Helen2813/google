import { useSession, signIn, signOut } from "next-auth/react";

function User({ className }) {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <img
          src={session.user.image} alt="avatar"
          className={`h-10 w-10 rounded-full hover:bg-gray-200 cursor-pointer rounded-lg ${className}`}
          onClick={signOut}
        />
      </>
    )
  }

  return (
      <button
        onClick={signIn}
        className={`bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:brightness-105 hover:shadow-md ${className}`}
      >
        Sign In
      </button>
  );
}

export default User;

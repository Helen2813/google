import React from 'react';
import Header from "../../components/Header";
import { getProviders, signIn } from "next-auth/react";

export default function signin ({ providers }) {
  return (
    <>
      <Header />
      <div className="mt-40">
        {Object.values(providers).map(provider => (
          <div className="flex flex-col items-center" key={provider.name}>
            <img
              className="w-52 object-cover"
              src="https://www.freepngimg.com/thumb/google/66873-logo-google-plus-free-clipart-hq.png"
              alt="google-logo"
            />
            <p className="text-sm italic my-10 text-center">
              This website is created for learning purposes
            </p>
            <button
              className="bg-red-400 rounded-lg text-white p-3 hover:bg-red-500"
              onClick={() => signIn(provider.id, {callbackUrl: "/"})}
            >
              Sign In with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}

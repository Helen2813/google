import Head from 'next/head'
import Header from "../components/Header";
import Image from "next/image";
import { SearchIcon, MicrophoneIcon } from "@heroicons/react/solid";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home() {
  const searchInputRef = useRef(null);
  const router = useRouter();

  const search = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;

    router.push(`/search?term=${term.trim()}&searchType=`);
  }

  const randomSearch = async (event) => {
    event.preventDefault();
    const randomTerm = await fetch('https://random-word-api.herokuapp.com/word')
      .then(res => res.json());
    if (!randomTerm?.length) return;

    router.push(`/search?term=${randomTerm[0]}&searchType=`);
  }

  return (
    <div>
      <Head>
        <title>Google clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <form className="flex flex-col items-center mt-40">
        <Image
          src="https://www.freepngimg.com/thumb/google/66873-logo-google-plus-free-clipart-hq.png"
          width="300"
          height="100"
          objectFit="cover"
        />
        <div
          className="flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 hover:shadow-lg
          focus-within:shadow-lg px-5 py-3 rounded-full items-center sm:max-w-xl lg:max-w-2xl"
        >
          <SearchIcon className="h-5 text-gray-500 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow focus:outline-none"
          />
          <MicrophoneIcon className="h-5" />
        </div>
        <div className="flex flex-col sm:flex-row w-[50%] space-y-2 mt-8 sm:space-y-0 sm:space-x-4 justify-center">
          <button className="btn" onClick={search}>Google Search</button>
          <button onClick={randomSearch} className="btn">I&apos;m Feeling Lucky</button>
        </div>
      </form>

      <Footer />
    </div>
  )
}

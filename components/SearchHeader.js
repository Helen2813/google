import React, { useRef } from 'react';
import Image from "next/image";
import { useRouter } from "next/router";
import { MicrophoneIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import User from "./User";
import SearchHeaderOptions from "./SearchHeaderOptions";

const SearchHeader = () => {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const search = (event) => {
    event.preventDefault();
    const term = searchInputRef.current.value;

    if (!term.trim()) return;

    router.push(`/search?term=${term.trim()}&searchType=`);
  }

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center">
        <Image
          onClick={() => router.push("/")}
          src="https://www.freepngimg.com/thumb/google/66873-logo-google-plus-free-clipart-hq.png"
          width="120"
          height="40"
          objectFit="contain"
          className="cursor-pointer"
          alt="google-image"
        />
        <form
          className="flex border border-gray-200 rounded-full shadow-lg px-6 py-3 ml-10 mr-5 flex-grow max-w-3xl items-center"
        >
          <input
            ref={searchInputRef}
            className="w-full focus:outline-none" type="text" defaultValue={router.query.term}
          />
          <XIcon onClick={() => (searchInputRef.current.value = "")} className="h-7 text-gray-500 cursor-pointer sm:mr-3" />
          <MicrophoneIcon className="h-6 hidden sm:inline-flex text-blue-500 pl-4 border-l-2 mr-3" />
          <SearchIcon className="h-6 hidden sm:inline-flex text-blue-500" />
          <button onClick={search} type="submit" hidden />
        </form>
        <User className="ml-auto whitespace-nowrap" />
      </div>
      <SearchHeaderOptions />
    </header>
  );
};

export default SearchHeader;

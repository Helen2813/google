import React from 'react';
import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import Response from "../Response";
import SearchResults from "../components/SearchResults";
import { useRouter } from 'next/router'

function Search({ results }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{router.query.term} - Search Page</title>
      </Head>

      <SearchHeader />

      <SearchResults results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const mockData = true; // because only 100 requests per day
  const data = mockData ? Response : await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${context.query.searchType && "&searchType=image"}`
  ).then((response) => response.json());
  return {
    props: {
      results: data,
    }
  }
}

export default Search;

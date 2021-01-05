import algoliasearch, { SearchClient } from "algoliasearch";

import { AlgoliaTextSearchDelegate } from "@camberi/firecms";


let client: SearchClient | undefined = undefined;
if (process.env.REACT_APP_ALGOLIA_APP_ID && process.env.REACT_APP_ALGOLIA_SEARCH_KEY) {
    client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);
} else {
    console.error("REACT_APP_ALGOLIA_APP_ID or REACT_APP_ALGOLIA_SEARCH_KEY env variables not specified");
    console.error("Text search not enabled");
}

export const partnersSearchDelegate = client && new AlgoliaTextSearchDelegate(
    client,
    "partners");
export const usersSearchDelegate = client && new AlgoliaTextSearchDelegate(
    client,
    "users");
// export const blogSearchDelegate = client && new AlgoliaTextSearchDelegate(
//     client,
//     "coupons");

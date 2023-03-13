import { createClient } from "./blogpump/node_modules/next-sanity";
import imageUrlBuilder from './blogpump/node_modules/@sanity/image-url';

export const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",
    useCdn: process.env.NODE_ENV === "production",
}

//set up the client for fetching the data in getProps page functions

export const sanityClient =  createClient(config);

// set up a helper function for fetching the image URLs with
// only asset reference data in your docs

export const urlFor = (source) => imageUrlBuilder(config).image(source);
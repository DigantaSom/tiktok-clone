import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'dog79jzs', // we can get it from: sanity-backend server > Manage Projects
  dataset: 'production',
  apiVersion: '2022-07-03',
  useCdn: false,
  // we can get the token from: sanity-backend server > Manage Projects > API > Tokens > Add API Token
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

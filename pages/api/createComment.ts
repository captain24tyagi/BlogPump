import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient, { createClient } from '@sanity/client'

export const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
}
const client = createClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

    //destructuring the inputs taken from form

  const { _id, name, email, comment } = JSON.parse(req.body);

  //try catch allows to capture any issues if present.

  try {
    await client.create({
        //creating a document in sanity CMS {comment doc}
        _type: 'comment',
        post: {
            _type: 'reference',
            _ref: _id,
        },
        name,
        email,
        comment
    })
  } catch (err) {
    return res.status(500).json({ message: "Couldn't submit the comment", err })
  }
  console.log('comment submitted')
  return res.status(200).json({ message: "Comment submitted" });
}

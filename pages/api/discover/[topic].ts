import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';
import { Video } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { topic } = req.query;
    const videosQuery = topicPostsQuery(topic as string);
    const videos: Video[] = await client.fetch(videosQuery);
    res.status(200).json(videos);
  }
}

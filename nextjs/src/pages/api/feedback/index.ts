import { Feedback, FeedbackResponse } from '@/types/Feedback';
import { NextApiRequest, NextApiResponse } from 'next';
import { FeedbackController } from './controller';

const controller = new FeedbackController();

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Feedback | FeedbackResponse>,
) => {
  switch (req.method) {
    case 'GET':
      return controller.get(req, res);

    case 'POST':
      return controller.create(req, res);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import { FeedbackService } from './service';
import { feedbackSchema } from './validation';
import { z } from 'zod';

export class FeedbackController {
  private service: FeedbackService;

  constructor() {
    this.service = new FeedbackService();
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { query } = req;
      const feedback = await this.service.get(query);
      if (!feedback) {
        res.status(404).json({ message: 'No feedback posts found.' });
      }
      res.status(200).json(feedback);
    } catch (error) {
      console.error('Error querying DynamoDB:', error);
      return res.status(500).json({
        message:
          'An error occured while processing your request. Please Try again later',
      });
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const validatedData = feedbackSchema.parse(req.body);
      const feedback = await this.service.create(validatedData);
      return res.status(201).json(feedback);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.issues.map((issue) => issue.message).join('\n'),
        });
      }
      return res.status(500).json({
        message: 'Failed to create feedback. Please Try again later.',
      });
    }
  }
}

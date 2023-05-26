import { verifyMessage } from 'ethers';
import { NextFunction, Request, Response } from 'express';

export const checkUserAddress = (req: Request, res: Response, next: NextFunction) => {
  const sign = req.header('sign');

  if (typeof sign !== 'string') {
    res.status(400).json({ error: 'Missing sign header' });
    return;
  }

  const singAddress = verifyMessage('wallet verify', sign);

  if (singAddress !== req.body.address) {
    res.status(400).json({ error: 'Invalid sign' });
  }

  next();
};

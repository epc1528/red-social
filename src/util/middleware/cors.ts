import * as cors from 'cors';

export const corss = cors({
  origin: '*',
  optionsSuccessStatus: 200
});
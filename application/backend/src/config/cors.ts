export const ORIGINS = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3100',
  'http://localhost:3100'
];

type CB = (err: Error | null, origin?: boolean | undefined) => void;

export const corsOptions = {
  origin: (origin: string | undefined, callback: CB) => {
    if (!origin || ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

export const origins = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3100',
  'http://localhost:3100'
];

// eslint-disable-next-line no-unused-vars
type CB = (err: Error | null, origin?: boolean | undefined) => void;

export const corsOptions = {
  origin: (origin: string | undefined, callback: CB) => {
    if (!origin || origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

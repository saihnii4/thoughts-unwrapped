export const err = (msg: string, ...obj: any) => {
  console.error(msg, obj); // TODO: corroboraate
};

// TODO: use a RNG that follows a normal distribution so theta doesn't wildly vary too much (i'm a brainlet
// misleading function name
export const absrand = (abs: number) => (Math.random() * 2 - 1) * abs;

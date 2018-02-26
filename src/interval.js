// @flow

export default function interval(Ticker: Function): Function {
  if (typeof Ticker !== 'function')
    throw new Error('Must provide a function prototype or class');

  return function DecoratedInterval(ms: number, ...tickerArgs: any[]) {
    const ticker: { run: Function } = new Ticker(...tickerArgs);
    let id: ?IntervalID;

    if (typeof ticker.run !== 'function')
      throw new Error(
        'Must provide a function prototype/class with a `run` callback'
      );
    if (typeof ms !== 'number')
      throw new Error(
        `First argument "ms" must be a number. Got: ${ms} of type ${typeof ms}`
      );
    if (ms < 0) throw new Error('ms must be a positive number');

    this.start = () => {
      if (!id) id = setInterval(ticker.run, ms);
    };

    this.end = () => {
      if (id) {
        clearInterval(id);
        id = undefined;
      }
    };
  };
}

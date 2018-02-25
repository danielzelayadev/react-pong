export default function interval(Ticker) {
  if (typeof Ticker !== 'function')
    throw new Error('Must provide a function prototype or class');

  return function DecoratedInterval() {
    const ticker = new Ticker();
    let id;

    if (typeof ticker.run !== 'function' || typeof ticker.ms !== 'number')
      throw new Error(
        'Must provide a function prototype/class with a `run` callback and `ms` number'
      );
    if (ticker.ms < 0) throw new Error('ms must be a positive number');

    this.start = () => {
      if (!id) id = setInterval(ticker.run, ticker.ms);
    };

    this.end = () => {
      if (id) {
        clearInterval(id);
        id = undefined;
      }
    };
  };
}

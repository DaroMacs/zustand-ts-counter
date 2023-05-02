import { shallow } from "zustand/shallow";
import { useCounterStore } from "./store/counterStore";
import { useEffect } from "react";

const App = () => {
  const { counter, title, posts } = useCounterStore(
    (state) => ({
      counter: state.count,
      title: state.title,
      posts: state.posts,
    }),
    shallow
  );

  const { increment, getPosts, clearStore, multiply } = useCounterStore();

  useEffect(() => {
    getPosts();
  }, []);

  const handleIncrement = (value: number) => {
    increment(value);
  };

  return (
    <div>
      <h1>{title + counter}</h1>
      <button onClick={() => handleIncrement(30)}>Increment</button>
      <button onClick={() => multiply(2)}>Multiply</button>
      <button onClick={clearStore}>Clear Store</button>
      <hr />
      <div>{JSON.stringify(posts)}</div>
    </div>
  );
};

export default App;

import { create } from "zustand";

interface IPost {
  id: number;
  title: string;
  body: string;
}

interface ICounterState {
  count: number;
  title: string;
  increment: (value: number) => void;
  posts: IPost[];
  getPosts: () => Promise<void>;
  clearStore: () => void;
  multiply: (value: number) => void;
}

export const useCounterStore = create<ICounterState>((set, get) => ({
  count: 10,
  title: "Counter set to",
  posts: [],
  increment: (value: number) =>
    set((state) => ({
      count: state.count + value,
    })),
  getPosts: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);

    set((state) => ({
      ...state,
      posts: data,
    }));
  },
  clearStore: () => {
    set({}, true);
  },

  multiply: (value: number) => {
    const { count } = get();
    set({ count: count * value });
  },
}));

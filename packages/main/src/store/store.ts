import Store from 'electron-store';

const schema = {
  keys: {
    type: 'array',
    default: [],
  },
} as const;

const store = new Store({schema});

export default store;

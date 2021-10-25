export const initialState = {
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    logged: false,
    id: '1',
    email: 'test@test.pl',
  },
};

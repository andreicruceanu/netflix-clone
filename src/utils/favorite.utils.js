const favoriteUtils = {
  check: ({ favoriteList, id }) =>
    favoriteList &&
    favoriteList.find((e) => e.id.toString() === id.toString()) !== undefined,
};

export default favoriteUtils;

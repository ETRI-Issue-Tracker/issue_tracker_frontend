export const enterKeyPressHandler = (e, callback = () => {}) => {
  if (e.key === 'Enter') {
    callback();
  }
};

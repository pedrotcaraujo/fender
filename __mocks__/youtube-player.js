const youtubePlayer = jest.fn(() => ({loadVideoById, on, getCurrentTime}));

const loadVideoById = jest.fn();
const on = jest.fn();
const getCurrentTime = jest.fn(() => Promise.resolve(10))

module.exports = youtubePlayer;
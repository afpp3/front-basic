const request = (url, options) =>
  fetch(url, options)
    .then((r) => r.json())
    .catch((e) => ({ error: true, message: e.message }));

export const get = (url) => request(url);

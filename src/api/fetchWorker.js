// protection from debugging (through request call stack)
function fetchWWorker(url, options) {
    return new Promise((resolve, reject) => {
        const workerCode = `
self.addEventListener('message', async (ev) => {
  const { url, options } = ev.data;
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    self.postMessage({ ok: res.ok, status: res.status, body: text });
  } catch(err) {
    self.postMessage({ error: err.message || String(err) });
  }
});
`;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));

        worker.onmessage = (ev) => {
            worker.terminate();
            if (ev.data.error) reject(new Error(ev.data.error));
            else resolve(ev.data);
        };

        worker.postMessage({ url, options });
    });
}

export { fetchWWorker }
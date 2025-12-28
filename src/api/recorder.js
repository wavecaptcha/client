function recordMouseMouvements(mm) {
  let last = 0;
  document.addEventListener("mousemove", (event) => {
    const now = Date.now();
    if (now - last > 20) {
      mm.push([event.clientX, event.clientY, now]);
      last = now;
    }
  });
  return;
}
function recordKeyBoard(kb) {
  document.addEventListener("keydown", function (event) {
    kb.push([event.key, Date.now()]);
  });
  document.addEventListener("keyup", (event) => {
    kb.push([event.key, Date.now()]);
  });
  return;
}
export { recordKeyBoard, recordMouseMouvements };

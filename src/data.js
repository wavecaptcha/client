import { recordKeyBoard, recordMouseMouvements } from "./api/recorder";

const mm = [];
const kb = [];
function getKb() {
  return kb;
}
function getMm() {
  return mm;
}
recordMouseMouvements(mm);
recordKeyBoard(kb);
export { getKb, getMm };

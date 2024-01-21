export type Status = "sleeping" | "afk" | "on";

let status: Status = "on";

function getStatus() {
  return status;
}

function setStatus(newStatus: Status) {
  status = newStatus;
}

export { getStatus, setStatus };

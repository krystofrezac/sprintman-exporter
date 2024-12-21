import fs from 'fs'

const authorization = ""
const sprintId = "670ffb5a8ab93100234c321b"

const res = await fetch(`https://uuapp.plus4u.net/uu-sprintman-maing01/74923401069c47ed8521e1ff9664e39b/ticket/listBySprint?sprint=${sprintId}`, {
  "headers": {
    "accept": "application/json",
    "accept-language": "en;q=1,*;q=0.001",
    "authorization": `Bearer ${authorization}`,
    "x-request-id": "0489fd73-02eaa72d-b5967290-0000",
  },
  "body": null,
  "method": "GET"
}).then(r => r.json());

const itemList = res.itemList

const mappedItems = itemList.map(item => {
  const hours = item.stateReason?.match(/\d+h/g)?.map(([text]) => text).join(";") ?? "-"
  const stateReason = item.stateReason?.replaceAll(/<[^>]*>/g, " ")?.replaceAll(",", ";") ?? "-"
  return `${item.name.replaceAll(",", ";")},${item.state},${hours},${item.responsibleSolver?.name},${stateReason}`
}).join("\n")
const csv = "Name,State, Time,Assignee,Comment\n" + mappedItems

fs.writeFileSync("export.csv", csv, "utf8")

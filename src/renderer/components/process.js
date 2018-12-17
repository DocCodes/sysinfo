function Process (p) {
  return `<tr>
    <th scope="col">${p.pid}</th>
    <td>${p.name}</td>
    <td>${p.pcpus.toFixed(0)}%</td>
    <td>${p.pcpuu.toFixed(0)}%</td>
    <td>${p.started}</td>
  </tr>`
}

module.exports = {
  Process: Process
}

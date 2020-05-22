

import wrapper from './wrapper';

function render(data) {
  const { content } = data;
  const rows = [];
  content.forEach((rowData) => {
    const row = `<tr>${rowData.map(colData => `<td class="tc-table__cell">
      <div class="tc-table__area">
        <div class="tc-table__inp" contenteditable="true">${colData}</div>
      </div>
    </td>`).join('')}</tr>`;
    rows.push(row);
  });
  return `<div class="tc-table-renderer">
    <div class="tc-table__wrap">
      <table class="tc-table">
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

export default wrapper(render);

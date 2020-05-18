export default function wrapper(plugin) {
  return data => `<div class="block">${plugin(data)}</div>`;
}

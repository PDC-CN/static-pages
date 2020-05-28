let editor;

export function injectEditor(e) {
  editor = e;
}

export default function message(obj) {
  if (!editor) return;
  editor.notifier.show(obj);
}

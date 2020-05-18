import '../_lib/editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import plugins from '../company/plugins';

const { $, PAGE_DATA } = window;

function init() {
  new EditorJS({
    holderId: 'hiddenHolder',
    tools: {
      Header,
      // image: {
      //   class: Image,
      //   config: {
      //     endpoints: {
      //       byFile: '/uploadFile', // Your backend file uploader endpoint
      //       byUrl: '/fetchUrl', // Your endpoint that provides uploading by Url
      //     },
      //   },
      // },
      List,
    },
  });

  const { blocks } = PAGE_DATA;
  const $holder = $('#holder');
  blocks.forEach((block) => {
    if (plugins[block.type]) {
      $holder.append(plugins[block.type](block.data));
    }
  });
}

$(() => {
  init();
});

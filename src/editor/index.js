import '../_lib/editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';
import Quote from './plugins/quote';
import Image from './plugins/image';
import Header2 from './plugins/header2';
import Config from './plugins/config';
import Album from './plugins/album';
import Album2 from './plugins/album2';
import Format from './plugins/format';
import Video from './plugins/video';
import Attachment from './plugins/attachment';
import getI18n from './i18n';

import { fileSizeLimit } from './lib';
import { injectEditor } from './lib/message';

const { PAGE_DATA, PAGE_SAVE, $ } = window;
const i18n = getI18n();

let initData = PAGE_DATA;
if (!initData || !initData.version) {
  initData = {
    time: new Date().getTime(),
    blocks: [{
      type: 'Config',
      data: {
        pageBackground: '',
        textColor: '',
        maxContainerWidth: 1200,
      },
    }],
    version: '2.18.0',
  };
}

const editor = new EditorJS({
  holderId: 'holder',
  placeholder: 'Let`s write an awesome story!',
  tools: {
    Config,
    Header,
    Header2,
    List,
    Checklist,
    Image: {
      class: Image,
      config: {
        endpoints: {
          byFile: '/en/images', // Your backend file uploader endpoint
          // byUrl: '/fetchUrl', // Your endpoint that provides uploading by Url
        },
        captionPlaceholder: i18n.dic.image.captionPlaceholder,
        buttonContent: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.15 13.628A7.749 7.749 0 0 0 10 17.75a7.74 7.74 0 0 0 6.305-3.242l-2.387-2.127-2.765 2.244-4.389-4.496-3.614 3.5zm-.787-2.303l4.446-4.371 4.52 4.63 2.534-2.057 3.533 2.797c.23-.734.354-1.514.354-2.324a7.75 7.75 0 1 0-15.387 1.325zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg> 选择图片',
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file) {
            // 限制大小
            if (!fileSizeLimit(file)) {
              return Promise.resolve('SIZE_LIMIT');
            }
            // your own uploading logic here
            const formData = new FormData();
            formData.append('image', file);
            return new Promise((resolve) => {
              $.ajax({
                url: '/en/images',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
              }).always((resp) => {
                if (resp.url) {
                  resolve({
                    success: 1,
                    file: {
                      url: resp.url,
                    },
                  });
                } else {
                  resolve({
                    success: 0,
                  });
                }
              });
            });
          },
        },
      },
    },
    Album,
    Album2,
    Quote,
    Table,
    Format,
    Video,
    Attachment,
  },
  i18n,
  data: initData,
});

window.aaa = editor;

const saveButton = document.getElementById('save');

injectEditor(editor);

saveButton.addEventListener('click', () => {
  if (PAGE_SAVE) {
    editor.save().then(PAGE_SAVE);
  }
});

window.eee = editor;

$('.alert .editor-btn').click(() => {
  $('.alert').removeClass('preview-mode');
  $('#holder').removeClass('preview-mode');
  $('.alert .editor-btn').addClass('active');
  $('.alert .preview-btn').removeClass('active');
});
$('.alert .preview-btn').click(() => {
  $('.alert').addClass('preview-mode');
  $('#holder').addClass('preview-mode');
  $('.alert .preview-btn').addClass('active');
  $('.alert .editor-btn').removeClass('active');
});

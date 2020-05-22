import '../_lib/editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';
import Quote from './plugins/quote';
import Header2 from './plugins/header2';
import Config from './plugins/config';
import Album from './plugins/album';
import Album2 from './plugins/album2';
import i18n from './i18n';

const { PAGE_DATA, PAGE_SAVE, $ } = window;

let initData = PAGE_DATA;
if (!initData) {
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
  tools: {
    Config,
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
    Header2,
    List,
    Checklist,
    Quote,
    Table,
    Album,
    Album2,
  },
  i18n,
  data: initData,
});

const saveButton = document.getElementById('save');

saveButton.addEventListener('click', () => {
  if (PAGE_SAVE) {
    editor.save().then(PAGE_SAVE);
  }
});

$('.alert .editor-btn').click(() => {
  $('#holder').removeClass('preview-mode');
  $('.alert .editor-btn').addClass('active');
  $('.alert .preview-btn').removeClass('active');
});
$('.alert .preview-btn').click(() => {
  $('#holder').addClass('preview-mode');
  $('.alert .preview-btn').addClass('active');
  $('.alert .editor-btn').removeClass('active');
});

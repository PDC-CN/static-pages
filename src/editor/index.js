import '../_lib/editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Header2 from './plugins/header2';
import Album from './plugins/album';
import Album2 from './plugins/album2';
import i18n from './i18n';

const { PAGE_DATA, PAGE_SAVE } = window;


const editor = new EditorJS({
  holderId: 'holder',
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
    Header2,
    List,
    Album,
    Album2,
  },
  i18n,
  data: PAGE_DATA,
});

const saveButton = document.getElementById('save');

saveButton.addEventListener('click', () => {
  if (PAGE_SAVE) {
    editor.save().then(PAGE_SAVE);
  }
});

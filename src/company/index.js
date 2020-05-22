import '../_lib/editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Table from '@editorjs/table';
import Image from '@editorjs/image';
import plugins from './plugins';

const { $, PAGE_DATA, Swiper } = window;

// function renderAlbum() {
//   const { Swiper } = window;
//   $('.ce-album').each((_, el) => {
//     const $el = $(el);
//     // 1. 去除留白
//     $('a:empty', $el).remove();
//     // 2. 渲染
//     const $w = $('<div class="swiper-wrapper"></div>');
//     $('a', $el).wrap('<div class="swiper-slide"></div>');
//     $('.swiper-slide', $el).appendTo($w);
//     $w.appendTo($el);
//     $(el).append('<div class="swiper-pagination"></div>');
//     $(el).addClass('ready-render');
//   });

//   new Swiper('.ready-render', {
//     // loop: true,
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
//   });
// }

function renderAlbum() {
  $('.ce-album').each((_, el) => {
    const $el = $(el);
    // 1. 去除留白
    $('a:empty', $el).remove();
  });
}

function init() {
  new EditorJS({
    holderId: 'hiddenHolder',
    tools: {
      Header,
      List,
      Checklist,
      Table,
      Image,
    },
  });

  const { blocks } = PAGE_DATA;
  const $holder = $('#holder');
  blocks.forEach((block) => {
    if (plugins[block.type]) {
      $holder.append(plugins[block.type](block.data));
    }
  });

  if (window.innerWidth <= 600) {
    // 渲染相册
    renderAlbum();
  }
}

$(() => {
  init();
});

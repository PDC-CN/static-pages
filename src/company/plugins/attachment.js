// {
//   filename: 'zip.zip',
//   size: 4853,
//   url: '/uploads/image/image/752/zip.zip',
// }
import { humanFileSize } from '../../_common/index';
import wrapper from './wrapper';

function render(data) {
  const { filename, size, url } = data;
  if (!url) return '';
  return `<div class="ce-attachment">
    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M676.257 349.44l-57.42-57.059-287.098 285.415c-22.035 21.858-35.677 52.148-35.677 85.626s13.642 63.768 35.669 85.618c47.564 47.286 124.693 47.286 172.268 0.007l344.518-342.512c79.307-78.803 79.307-206.602 0-285.406-79.253-78.84-207.808-78.84-287.080 0l-361.726 359.638c-0.252 0.27-0.54 0.503-0.774 0.747-110.582 109.943-110.582 288.151 0 398.060 110.538 109.907 289.817 109.907 400.408 0 0.243-0.243 0.45-0.503 0.72-0.774l0.036 0.027 246.905-245.465-57.438-57.059-246.914 245.447c-0.261 0.233-0.495 0.495-0.747 0.739-78.731 78.273-206.819 78.273-285.569 0-78.731-78.254-78.731-205.595 0-283.859 0.27-0.27 0.531-0.522 0.783-0.747l-0.045-0.053 361.771-359.638c47.475-47.231 124.757-47.231 172.259 0 47.483 47.231 47.483 124.055 0 171.243l-344.518 342.512c-7.371 7.301-17.515 11.812-28.715 11.812s-21.344-4.511-28.717-11.816c-7.327-7.285-11.863-17.376-11.863-28.526 0-11.151 4.537-21.241 11.864-28.528l287.1-285.454z" p-id="1158"></path></svg>
    <div>
      <div class="filename">${filename}</div>
      <div class="size">${humanFileSize(size)}</div>
    </div>
    <a href="${url}" target="_blank">
      <svg class="download-btn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4101" width="48" height="48"><path d="M920.7 639.4c-22.1 0-40 17.9-40 40v167H143.3v-167c0-22.1-17.9-40-40-40s-40 17.9-40 40v197c0 27.6 22.4 50 50 50h797.3c27.6 0 50-22.4 50-50v-197c0.1-22.1-17.8-40-39.9-40z" p-id="4102"></path><path d="M482.9 733.8l0.2 0.2 0.8 0.8 0.6 0.6c0.3 0.2 0.5 0.5 0.8 0.7s0.5 0.4 0.8 0.7c0.2 0.2 0.4 0.3 0.6 0.5 0.3 0.2 0.6 0.5 0.9 0.7 0.1 0.1 0.3 0.2 0.4 0.3 1.8 1.4 3.8 2.5 5.8 3.5 0.2 0.1 0.3 0.2 0.5 0.2 0.3 0.1 0.6 0.3 0.9 0.4 0.3 0.1 0.6 0.3 0.9 0.4 0.2 0.1 0.5 0.2 0.7 0.3 0.4 0.2 0.8 0.3 1.2 0.5 0.2 0.1 0.3 0.1 0.5 0.2 0.5 0.2 0.9 0.3 1.4 0.5 0.1 0 0.2 0.1 0.4 0.1 0.5 0.2 1 0.3 1.6 0.4 0.1 0 0.2 0 0.3 0.1 0.5 0.1 1.1 0.3 1.7 0.4h0.3c0.6 0.1 1.1 0.2 1.7 0.3h0.4c0.5 0.1 1 0.1 1.6 0.2 0.2 0 0.5 0 0.7 0.1 0.4 0 0.8 0.1 1.3 0.1h4c10.5 0 21-4.1 28.8-12.2l255.4-265.1c15.3-15.9 14.9-41.2-1.1-56.6-15.9-15.3-41.2-14.9-56.6 1.1L551.7 608.9V137.5c0-22.1-17.9-40-40-40s-40 17.9-40 40v469.4L285.1 413.2c-15.3-15.9-40.6-16.4-56.6-1.1-15.9 15.3-16.4 40.7-1.1 56.6l255.5 265.1z" p-id="4103"></path></svg>
    </a>
  </div>`;
}

export default wrapper(render);

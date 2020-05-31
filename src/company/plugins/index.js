import Header from './header';
import paragraph from './paragraph';
import Header2 from './header2';
import Album from './album';
import Album2 from './album2';
import Config from './config';
import Checklist from './checklist';
import Quote from './quote';
import Image from './image';
import Table from './table';
import Attachment from './attachment';
import Video from './video';
import Carousel, { afterCarouselRender } from './carousel';
import format from './format';

const plugins = {
  Header,
  paragraph,
  Header2,
  Album,
  Album2,
  Config,
  Checklist,
  Quote,
  Image,
  Table,
  Video,
  Attachment,
  Carousel,
  afterRender: () => {
    format();
    afterCarouselRender();
  },
};

export default plugins;

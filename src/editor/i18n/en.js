/**
* To provide localization of the editor.js you need to provide 'i18n' option with 'messages' dictionary:
*
* 1. At the 'ui' section of 'messages' there are translations for the internal editor.js UI elements.
*   You can create or find/download a dictionary for your language
*
* 2. As long as tools list is a user-specific thing (we do not know which tools you use and under which names),
*    so we can't provide a ready-to-use tool names dictionary.
*    There is a 'toolNames' section for that reason. Put translations for the names of your tools there.
*
* 3. Also, the UI of the tools you use is also invisible to editor.js core.
*    To pass translations for specific tools (that supports I18n API), there are 'tools' and 'blockTunes' section.
*    Pass dictionaries for specific plugins through them.
*/
const i18n = {
  /**
  * @type {I18nDictionary}
  */
  messages: {
    /**
    * Other below: translation of different UI components of the editor.js core
    */
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'Click to tune',
          'or drag to move': 'or drag to move',
        },
      },
      inlineToolbar: {
        converter: {
          'Convert to': 'Convert to',
        },
      },
      toolbar: {
        toolbox: {
          Add: 'Add',
        },
      },
    },

    /**
    * Section for translation Tool Names: both block and inline tools
    */
    toolNames: {
      Text: 'Text',
      Heading: 'Heading',
      List: 'List',
      Warning: 'Warning',
      Checklist: 'Checklist',
      Quote: 'Quote',
      Code: 'Code',
      Delimiter: 'Delimiter',
      'Raw HTML': 'Raw HTML',
      Table: 'Table',
      Link: 'Link',
      Marker: 'Marker',
      Bold: 'Bold',
      Italic: 'Italic',
      InlineCode: 'Inline Code',
      HeaderWithSub: 'Header With Subtitle',
      Album: 'Album',
      AlbumWithTitle: 'Album With Title',
      Image: 'Single Image',
      Format: 'Format',
      Video: 'Video',
      Attachment: 'Attachment',
    },

    /**
    * Section for passing translations to the external tools classes
    */
    tools: {
      /**
      * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
      * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
      */
      warning: { // <-- 'Warning' tool will accept this dictionary section
        Title: 'Title',
        Message: 'Message',
      },

      /**
      * Link is the internal Inline Tool
      */
      link: {
        'Add a link': 'Add a link',
      },
      /**
      * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
      */
      stub: {
        'The block can not be displayed correctly.': 'The block can not be displayed correctly.',
      },
    },

    /**
    * Section allows to translate Block Tunes
    */
    blockTunes: {
      /**
      * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
      * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
      *
      * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
      */
      delete: {
        Delete: 'Delete',
      },
      moveUp: {
        'Move up': 'Move up',
      },
      moveDown: {
        'Move down': 'Move down',
      },
    },
  },
  dic: {
    g: {
      hiddenTip: 'This section will not appear on the page',
    },
    image: {
      captionPlaceholder: 'Caption, default empty.',
      linkPlaceholder: 'Click link, default empty',
      eSize: 'Maximum 2MB, please compress',
      eNormal: 'Unable to upload currently, please try again later',
    },
    album: {
      col: 'Columns',
      info: 'Images',
      link: 'Click link',
      style: 'Style',
      styleCover: 'Cover',
      styleContain: 'Contain',
      bg: 'Container background',
      bgTip: 'Default is transparent, RGB color value, e.g., #3AFF22',
      title: 'Caption',
      desc: 'Description',
    },
    attachment: {
      tip: 'Click to upload',
      eFail: 'Upload failed, please try again',
    },
    config: {
      title: 'Global configuration',
      bg: 'Page background color',
      bgTip: 'RGB color value, e.g., #3AFF22',
      color: 'Font color',
      colorTip: 'Default will inherit page font color, RGB color value, e.g., #3AFF22',
      width: 'Context max witdh',
      widthTip: 'Pixel, e.g., 1200',
      tip: 'Click the blank space below to start editing',
    },
    format: {
      size: 'Size',
      sizeTip: 'Number, default is 14',
      color: 'Color',
      colorTip: 'RGB color value, e.g., #3AFF22',
      bg: 'Background color',
      bgTip: 'RGB color value, e.g., #3AFF22',
    },
    video: {
      size: 'Size',
      type: 'Platform',
      typeYouku: 'Youku',
      typeQq: 'QQ',
      typeB: 'Bilibili',
      typeIqiyi: 'Iqiyi',
      code: 'Code',
      codeTip: 'Please enter the embed code for the video, starting with <iframe',
      howTo: 'How to get the video embed code?',
    },
    uploader: {
      eSize: 'Maximum 2MB, please compress',
      eNormal: 'Unable to upload currently, please try again later',
      select: 'Select image',
    },
  },
};

export default i18n;

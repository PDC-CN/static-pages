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
          'Click to tune': '点击调整',
          'or drag to move': '拖动',
        },
      },
      inlineToolbar: {
        converter: {
          'Convert to': '转变为',
        },
      },
      toolbar: {
        toolbox: {
          Add: '新增',
        },
      },
    },

    /**
    * Section for translation Tool Names: both block and inline tools
    */
    toolNames: {
      Text: '文本',
      Heading: '标题',
      List: '列表',
      Warning: '警告',
      Checklist: '清单',
      Quote: '引用',
      Code: '代码',
      Delimiter: '分割线',
      'Raw HTML': 'HTML-фрагмент',
      Table: '表格',
      Link: '链接块',
      Marker: '标记',
      Bold: '粗体',
      Italic: '斜体',
      InlineCode: '行内代码',
      HeaderWithSub: '标题带副标题',
      Album: '图集',
      AlbumWithTitle: '带说明图集',
      Image: '图片',
      Format: '字体样式',
      Video: '外链视频',
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
        Title: '标题',
        Message: '消息',
      },

      /**
      * Link is the internal Inline Tool
      */
      link: {
        'Add a link': '增加一个链接',
      },
      /**
      * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
      */
      stub: {
        'The block can not be displayed correctly.': '这个内容块无法被正确显示',
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
        Delete: '删除',
      },
      moveUp: {
        'Move up': '上移',
      },
      moveDown: {
        'Move down': '下移',
      },
    },
  },
};

export default i18n;

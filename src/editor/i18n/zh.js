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
      Attachment: '附件',
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
  dic: {
    g: {
      hiddenTip: '此配置部分不会出现在页面上',
    },
    image: {
      captionPlaceholder: '图片小标题，不填为空',
      linkPlaceholder: '图片链接，默认为空',
      eSize: '图片大小限制为2MB，请压缩后上传',
      eNormal: '当前无法上传，请稍后重试',
    },
    album: {
      col: '列数',
      info: '图片信息',
      link: '图片点击链接',
      style: '样式',
      styleCover: '图片覆盖整个容器',
      styleContain: '容器包含整个图片',
      bg: '图片背景',
      bgTip: '空缺为透明，RGB色值，例如 #3AFF22',
      title: '图片标题',
      desc: '图片说明',
    },
    attachment: {
      tip: '点击上传附件',
      eFail: '上传失败，请重试',
    },
    config: {
      title: '全局配置',
      bg: '页面背景',
      bgTip: 'RGB色值，例如 #3AFF22',
      color: '文本颜色',
      colorTip: '空缺为默认，RGB色值，例如 #3AFF22',
      width: '容器最大宽度',
      widthTip: '像素，例如 1200',
      tip: '点击下方空白处开始编辑',
    },
    format: {
      size: '字体大小',
      sizeTip: '数字，默认14',
      color: '颜色',
      colorTip: 'RGB色值，如 #3AFF22',
      bg: '底纹颜色',
      bgTip: 'RGB色值，如 #3AFF22',
    },
    video: {
      size: '视频大小',
      type: '选择平台',
      typeYouku: '优酷',
      typeQq: '腾讯视频',
      typeB: 'Bilibili',
      typeIqiyi: '爱奇艺',
      code: '视频代码',
      codeTip: '请输入视频通用代码，以 <iframe 开头',
      howTo: '如何获取视频代码？',
    },
    uploader: {
      eSize: '图片大小限制为2MB，请压缩后上传',
      eNormal: '上传失败，请重试',
      select: '选择图片',
    },
  },
};

export default i18n;

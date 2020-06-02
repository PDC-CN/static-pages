import Pickr from '@simonwep/pickr';
import getI18n from '../i18n';

const i18n = getI18n().dic.colorPicker;
const { $ } = window;

const defaultConfig = {
  placeholder: '',
  initialValue: '',
  onChange: () => {},
};

function cleanColorString(str = '') {
  if (str[0] === '#') return str.slice(1);
  return str;
}

export default class ColorPicker {
  constructor($wrapper, config) {
    this.config = {
      ...defaultConfig,
      ...config,
    };
    this.config.initialValue = cleanColorString(this.config.initialValue);

    this.$wrapper = $wrapper;
    this.$wrapper.addClass('color-picker');
    this.$holder = $('<div class="color-picker-holder"></div>');
    this.$input = $(`<input type="text" class="color-picker-input" value="${this.config.initialValue}" placeholder="${this.config.placeholder}">`);
    this.$wrapper.append(this.$holder);
    this.$wrapper.append('<div class="color-picker-sharp">#</div>');
    this.$wrapper.append(this.$input);

    this.picker = Pickr.create({
      el: this.$holder[0],
      theme: 'monolith', // or 'monolith', or 'nano'
      swatches: null,
      components: {
        // Main components
        preview: true,
        // opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
          // hex: true,
          // rgba: true,
          // hsla: true,
          // hsva: true,
          // cmyk: true,
          input: true,
          clear: true,
          save: true,
        },
      },
      i18n,
      default: '#000',
    });
    this.picker.on('clear', () => {
      this._change('');
    });
    this.picker.on('save', (color) => {
      if (color) {
        this._change(color.toHEXA().toString());
      } else {
        this._change('');
      }
    });
    this.picker.on('init', () => {
      this.picker.setColor(this.config.initialValue ? '#' + this.config.initialValue : null);
    });
    this.$input.change((e) => {
      const { value } = e.target;
      if (value) {
        this.picker.setColor('#' + value);
      } else {
        this.picker.setColor(null);
      }
    });
  }

  _change(colorStr) {
    const cleanStr = cleanColorString(colorStr);
    this.$input.val(cleanStr);

    const outputStr = cleanStr ? '#' + cleanStr : '';
    this.$wrapper.attr('data-value', outputStr);
    this.config.onChange(outputStr);
  }

  onChange(func) {
    if (func) {
      this.config.onChange = func;
    } else {
      this.config.onChange = defaultConfig.onChange;
    }
  }

  setColor(value) {
    if (value) {
      this.picker.setColor('#' + cleanColorString(value));
      this._change(value);
    } else {
      this.picker.setColor(null);
      this._change('');
    }
  }
}

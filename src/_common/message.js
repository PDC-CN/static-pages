const message = {
  success: (text, timeout = 5000) => {
    new window.Noty({
      theme: 'mint',
      type: 'success',
      text,
      timeout,
    }).show();
  },
  error: (text, timeout = 5000) => {
    new window.Noty({
      theme: 'mint',
      type: 'error',
      text,
      timeout,
    }).show();
  },
};

export default message;

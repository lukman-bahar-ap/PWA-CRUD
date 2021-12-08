const launchToast = {
  init({
    icon, msg,
  }) {
    this._icon = icon;
    this._msg = msg;

    const toastElement = document.getElementById('toast');
    const iconElement = document.getElementById('icon-toast');
    const messageElement = document.getElementById('msg-toast');

    iconElement.innerHTML = this._icon;
    messageElement.innerText = this._msg;

    toastElement.className = 'show';
    setTimeout(() => {
      toastElement.className = toastElement.className.replace('show', '');
    }, 4000);
  },
};

export default launchToast;

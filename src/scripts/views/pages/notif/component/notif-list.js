import './notif-item';

class NotifList extends HTMLElement {
  set list(list) {
    this._list = list;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h2>${message}</h2>`;
  }

  render() {
    this.innerHTML = '';

    this._list.forEach((n) => {
      const itemElement = document.createElement('notif-item');
      itemElement.notif = n;
      this.appendChild(itemElement);
    });
  }
}

customElements.define('notif-list', NotifList);

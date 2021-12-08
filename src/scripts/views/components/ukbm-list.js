import './ukbm-item';

class UkbmList extends HTMLElement {
  set list(list) {
    this._list = list;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  _addItem(item) {
    const ukbmItemElement = document.createElement('ukbm-item');
    ukbmItemElement.ukbm = item;
    this.appendChild(ukbmItemElement);
  }

  render() {
    this.innerHTML = '';
    if (this._list.length > 0) {
      /* untuk list ukbm di homepage */
      this._list.forEach((ukbm) => {
        this._addItem(ukbm);
      });
    } else {
      /* untuk tampilan di halaman nilai kd */
      this._addItem(this._list);
    }
  }
}

customElements.define('ukbm-list', UkbmList);

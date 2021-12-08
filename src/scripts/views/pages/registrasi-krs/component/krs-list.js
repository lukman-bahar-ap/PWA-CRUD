import './krs-item';

class KrsList extends HTMLElement {
  set list(list) {
    this._list = list;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = '';
    this._list.forEach((item) => {
      const krstemElement = document.createElement('krs-item');
      krstemElement.ukbm = item;
      this.appendChild(krstemElement);
    });
  }
}

customElements.define('krs-list', KrsList);

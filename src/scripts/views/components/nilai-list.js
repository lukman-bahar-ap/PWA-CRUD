import './nilai-item';

class NilaiList extends HTMLElement {
  set list(list) {
    this._nilai = list.nilai;
    this._kkm = list.kkm;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = '';
    this._nilai.forEach((n) => {
      const nilaiItemElement = document.createElement('nilai-item');
      nilaiItemElement.nilai = { nilai: n, kkm: this._kkm };
      // /* add class css timeline for this custom element */
      this.appendChild(nilaiItemElement);
    });
  }
}

customElements.define('nilai-list', NilaiList);

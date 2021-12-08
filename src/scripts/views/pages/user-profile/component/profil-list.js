import './profil-item';

class ProfilList extends HTMLElement {
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
      if (n.FIELD !== 'PESERTA_DIDIK_ID' && n.FIELD !== 'KELAS_ID') {
        const itemElement = document.createElement('profil-item');
        itemElement.profil = n;
        this.appendChild(itemElement);
      }
    });
  }
}

customElements.define('profil-list', ProfilList);

import './berita-item';

class BeritaList extends HTMLElement {
  set news(news) {
    this._news = news;
    this.render();
  }

  renderError(message) {
    this.innerHTML = `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = '';

    this._news.forEach((berita) => {
      const beritaItemElement = document.createElement('berita-item');
      beritaItemElement.berita = berita;
      beritaItemElement.classList.add('viral-item');
      this.appendChild(beritaItemElement);
    });
  }
}

customElements.define('berita-list', BeritaList);

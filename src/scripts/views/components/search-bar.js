class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  /**
   * @param {any} event
   */
  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  /**
   * @param {any} headerTitle
   */
  set headerTitle(headerTitle) {
    this._headerTitle = headerTitle;
    this.render();
  }

  get value() {
    return this.querySelector('#searchElement').value;
  }

  render() {
    this.innerHTML = `
            <div class="filter">
                <h2 class="filter__title">${this._headerTitle}</h2>
                <div class="filter__content">
                    <div id="search-container" class="search-container">
                        <input placeholder="cari mata pelajaran apa ?" id="searchElement" type="search"
                        aria-label="Input keyword restaurant or cafe here" aria-keyshortcuts="s">
                        <button class="search__button" id="searchButtonElement" type="submit" 
                        aria-label="Click to start find your keyword">
                            <i class="material-icons">search</i>
                        </button>
                    </div>
                </div>
            </div>
        `;

    this.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
  }
}
customElements.define('search-bar', SearchBar);

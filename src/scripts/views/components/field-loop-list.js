import './field-loop-item';

class FieldLoopList extends HTMLElement {
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
      const itemElement = document.createElement('field-loop-item');
      itemElement.fieldLoop = n;
      this.appendChild(itemElement);
    });
  }
}

customElements.define('field-loop-list', FieldLoopList);

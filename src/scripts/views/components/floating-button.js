class FloatingBtnElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  render() {
    this.innerHTML = `
    <button aria-label="floating button" id="fButton" class="like">
      <i class="large material-icons">add</i>
    </button>`;
  }
}
customElements.define('floating-btn-elm', FloatingBtnElement);

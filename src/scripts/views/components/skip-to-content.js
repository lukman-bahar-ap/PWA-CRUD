class SkipToContentElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  render() {
    this.innerHTML = `
    <a href="#main-content" class="skip-link" aria-label="click for jump to content">Jump to content</a>`;
  }
}
customElements.define('skip-to-content', SkipToContentElement);

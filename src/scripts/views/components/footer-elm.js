class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <footer>
                <div></div>
            </footer>
        `;
  }
}
customElements.define('footer-elm', FooterElement);

class ToastElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  render() {
    this.innerHTML = `
    <div id="toast">
        <div id="icon-toast">Icon</div>
        <div id="msg-toast">notification</div>
    </div>`;
  }
}
customElements.define('toast-elm', ToastElement);

class HeroElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="hero hero__banner">
                <div class="hero__inner">
                    <h1 class="hero__title">Are You Food Hunter?</h1>
                    <p class="hero__tagline">Get experience now</p>
                </div>
            </div>
        `;
  }
}
customElements.define('hero-elm', HeroElement);

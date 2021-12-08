class UkbmItemSkeleton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    let skeleton = `
      <div class="discover-item__content">
        <h3 class="discover-item__title">
            <a href="/#/detail/" aria-label="klik untuk melihat detail">
                &nbsp;
            </a>
        </h3>
        <div class="w3-light-grey w3-round-xlarge">
          <div class="w3-container  w3-round-xlarge"></div>
        </div>
        <p class="discover-item__description">&nbsp;</p>
      </div>`;

    for (let i = 0; i <= 5; i++) {
      skeleton += skeleton;
    }
    this.innerHTML = skeleton;
  }
}

customElements.define('ukbm-itemskeleton', UkbmItemSkeleton);

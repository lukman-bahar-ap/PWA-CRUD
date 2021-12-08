class DetailPesan extends HTMLElement {
  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  render() {
    const {
      TITLE, MESSAGE, DATE_SEND,
    } = this._detail;

    this.innerHTML = `
        <article class="resto">
            <div class="resto__description">
                <h3 class="detail__header">${TITLE}</h3>
                <p class="detail-item__information">
                      <i class="material-icons">date_range</i> ${DATE_SEND}
                </p>
                <p>${MESSAGE}</p>
            </div>              
        </article>
        `;
  }
}

customElements.define('detail-pesan', DetailPesan);

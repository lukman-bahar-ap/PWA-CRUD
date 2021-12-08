class NotifRedElement extends HTMLElement {
  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  set notif(notif) {
    this._notif = notif;
    this.render();
  }

  render() {
    const {
      HEAD_NOTIF, BODY_NOTIF,
    } = this._notif;
    this.innerHTML = `
    <section class="content">
        <div class="info__card" id="cardElementClick">
            <h3>${HEAD_NOTIF}</h3>
            <p>${BODY_NOTIF}</p>  
        </div>
    </section>`;
    this.querySelector('#cardElementClick').addEventListener('click', this._clickEvent);
  }
}
customElements.define('notif-red-elm', NotifRedElement);

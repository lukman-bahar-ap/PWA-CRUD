class NotifGreenElement extends HTMLElement {
  set notif(notif) {
    this._notif = notif;
    this.render();
  }

  render() {
    this.innerHTML = `
    <section class="content">
        <div class="greend__card">
            <p>${this._notif}</p>  
        </div>
    </section>`;
  }
}
customElements.define('notif-green-elm', NotifGreenElement);

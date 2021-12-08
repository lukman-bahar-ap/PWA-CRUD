class NotifItem extends HTMLElement {
  set notif(notif) {
    this._notif = notif;
    this.render();
  }

  render() {
    const {
      NOTIFIKASI_ID, TITLE, MESSAGE, DATE_SEND, READED,
    } = this._notif;
    const msgNew = (READED === '0' || READED === 0) ? 'msg-new' : '';
    this.innerHTML = `
    <a href="/#/notifdetail/${NOTIFIKASI_ID}" class="a_nonunderline" aria-label="klik untuk melihat detail">
        <div class="box__card">
            <p class="box-name ${msgNew}">
              
              ${TITLE}
                          
              ${DATE_SEND}
            </p>
            <p class="box-body">${MESSAGE}</p>
        </div>
    </a>
    `;
  }
}

customElements.define('notif-item', NotifItem);

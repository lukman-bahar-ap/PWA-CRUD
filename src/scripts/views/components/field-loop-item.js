class FieldLoopItem extends HTMLElement {
  set fieldLoop(fieldLoop) {
    this._fieldLoop = fieldLoop;
    this.render();
  }

  render() {
    const { KOLOM, DATA } = this._fieldLoop;
    if (KOLOM !== 'Status' && KOLOM.substr(0, 2) !== 'Id') {
      this.innerHTML = `
          <div class="box__card">
              <p class="box-name">
                ${KOLOM}
              </p>
              <p class="box-body">${DATA}</p>
          </div>
      `;
    }
  }
}

customElements.define('field-loop-item', FieldLoopItem);

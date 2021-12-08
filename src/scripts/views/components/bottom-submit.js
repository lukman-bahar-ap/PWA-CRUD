import '../../../styles/bottom-fixed.scss';

class BottomSubmit extends HTMLElement {
  connectedCallback() {
    this._btnName = '';
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  set buttonName(btnName) {
    this._btnName = btnName;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="bottom-fixed__container">
      <button class="bottom-fixed__button" id="btnSubmit" name="btnSubmit" type="submit" 
        aria-label="Bottom Submit Button">
          ${this._btnName}
      </button>
    </div>`;

    this.querySelector('#btnSubmit').addEventListener('click', this._clickEvent);
  }
}
customElements.define('bottom-submit', BottomSubmit);

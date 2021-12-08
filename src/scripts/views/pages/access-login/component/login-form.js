import IMG from '../../../../globals/assets';

class LoginForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <form class="container_login">
      <figure>
        <picture>
          <source type="image/webp" srcset="${IMG.LOGO_WEBP}">
          <source type="image/jpeg" srcset="${IMG.LOGO_LOGIN}">
              <img src="${IMG.LOGO_LOGIN}" width="192px" height="192px"
              class="logo" alt="logo">
        </picture>
        <figcaption>Selamat datang di <b>DIGINAS</b></figcaption>
      </figure>
      <div class="form-group">

        <input type="text" id="reqNisn" name="reqNisn" 
        aria-label="NISN" placeholder="NISN">

      </div>
      <div class="form-group">

        <input type="password" id="reqPassword" name="reqPassword" 
        aria-label="password" placeholder="Password">
        <i class="material-icons" id="togglePassword">visibility</i>
      </div>
      <div class="form-group">

        <input type="hidden" id="reqMode" name="reqMode" value="login">

        <button class="login__button" id="btnLogin" type="submit" 
        aria-label="Klik Login setelah mengisi NISN dan Pasword">
            Login
        </button>

      </div>
      <div class="login__footer">
        <p>DIGINAS Web Apps © 2021</p>
      </div>
    </form>
    `;
  }
}
customElements.define('login-form', LoginForm);

class PasswordForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <h3 class="detail__header">Login</h3>
    <form class="container_form">
      <div class="form_group">
        <input type="password" id="reqCurrPassword" name="reqCurrPassword" 
        aria-label="Silahkan masukkan password saat ini" placeholder="Password Saat ini">
        <i class="material-icons" id="toggleCurrPassword">visibility</i>
      </div>
      <div class="form_group">
        <input type="password" id="reqNewPassword" name="reqNewPassword" 
        aria-label="Silahkan masukkan password baru" placeholder="Password Baru">
        <i class="material-icons" id="toggleNewPassword">visibility</i>
      </div>
      <div class="form_group">
        <input type="password" id="reqRePassword" name="reqRePassword" 
        aria-label="Silahkan ketik ulang password baru" placeholder="Ketik Ulang Password Baru">
        <i class="material-icons" id="toggleRePassword">visibility</i>
      </div>
      <div class="form_group">

        <input type="hidden" id="reqMode" name="reqMode" value="change-pass">

        <button class="review__button" id="btnSubmit" type="submit" 
        aria-label="Klik untuk mengubah password">
            Ubah Password
        </button>

      </div>
    </form>
    `;
  }
}
customElements.define('password-form', PasswordForm);

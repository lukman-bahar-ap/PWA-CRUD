class PasswordForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h3 class="detail__header">Change Password</h3>
      <form class="review__form">
        <div class="review-container">

          <label for="reqOldPass">Password Saat Ini</label>
          <input type="text" id="reqOldPass" name="reqOldPass" 
          aria-label="Please input your name in here" placeholder="Fill required">

        </div>
        <div class="review-container">

          <label for="reqNewPass">Name</label>
          <input type="text" id="reqNewPass" name="reqNewPass" 
          aria-label="Please input your name in here" placeholder="Fill required">

        </div>
        <div class="review-container">

          <label for="reqNewPass2">Name</label>
          <input type="text" id="reqNewPass2" name="reqNewPass2" 
          aria-label="Please input your name in here" placeholder="Fill required">

        </div>
        <div class="review-container">

          <button class="review__button" id="submitReview" type="submit" 
          aria-label="Click to show all discovery restaurant">
              Keluar Akun?.
            
          </button>

          <button class="review__button" id="submitReview" type="button" 
          aria-label="Click to show all discovery restaurant">
              Batal
          </button>

        </div>
      </form>
    `;
  }
}
customElements.define('password-form', PasswordForm);

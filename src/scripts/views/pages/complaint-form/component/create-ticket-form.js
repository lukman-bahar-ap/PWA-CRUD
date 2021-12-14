class CreateTicketForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <h3 class="detail__header">Login</h3>
    <form class="container_form">
      <div class="form_group">
        <input type="text" id="reqSN" name="reqSN" 
        aria-label="Serial Number" placeholder="Input Serial Number Unit">
      </div>
      <div class="form_group">
        <input type="text" id="reqLocation" name="reqLocation" 
        aria-label="Location" placeholder="Input Your Location">
      </div>
      <div class="form_group">
        <textarea id="reqComplaint" name="reqComplaint" 
        aria-label="Location" placeholder="Describe Complaint"></textarea>
      </div>
      <div class="form_group">

        <input type="hidden" id="reqMode" name="reqMode" value="change-pass">

        <button class="review__button" id="btnSubmit" type="submit" 
        aria-label="Klik untuk mengubah password">
            Submit
        </button>

      </div>
    </form>
    `;
  }
}
customElements.define('create-ticket-form', CreateTicketForm);

class UpdateTicketForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <h3 class="detail__header">Login</h3>
    <form class="container_form">
      <div class="form_group">
        <input type="text" id="reqNoTicket" name="reqNoTicket" aria-label="Ticket Number">
      </div>
      <div class="form_group">
        <select id="reqStatus" name="reqStatus">
          <option value="2">Assignee</option>
          <option value="3">On progress</option>
          <option value="4">Pending</option>
          <option value="5">Resolved</option>
          <option value="6">Cancel</option>
          <option value="12">Pending - Rejected by IT Onsite</option>
          <option value="8">Pending - Part Request</option>  
        </select>
      </div>
      <div class="form_group">
        <input type="text" id="reqNoted" name="reqNoted" 
        aria-label="Update Notes" placeholder="Update notes or description solution">
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
customElements.define('update-ticket-form', UpdateTicketForm);

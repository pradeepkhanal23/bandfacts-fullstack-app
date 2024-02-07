class Form {
  constructor() {
    this.formModal = document.querySelector("#form-modal");
  }

  eventHandlers() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  render() {
    this.formModal.innerHTML = `
    
      <form id="fact-form">
            <div class="mb-4">
              <label for="username" class="text-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                class="form-input w-full"
              />
            </div>
            <div class="mb-4">
              <label for="text" class="text-label">Text</label>
              <textarea
                id="text"
                name="text"
                class="form-textarea w-full"
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="tag" class="text-label">Tag</label>
              <input
                type="text"
                id="tag"
                name="tag"
                class="form-input w-full"
              />
            </div>
            <div class="text-center mt-3">
              <button
                id="submitBtn"
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
    
    `;

    //we put this line here because we are rendering the form via JS and the form element cannot be accessed before its created
    this.form = document.querySelector("#fact-form");
    this.eventHandlers();
  }

  //handle Submit Function
  handleSubmit(e) {
    e.preventDefault();

    //getting the form values, we have setup the ids and names in the form to get its values
    const username = this.form.elements.username.value;
    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;

    const fact = {
      username,
      text,
      tag,
    };

    console.log(fact);

    //clearing the form fields
    this.form.elements.username.value = "";
    this.form.elements.text.value = "";
    this.form.elements.tag.value = "";

    //because there is no connection between modal and form , we want a create and dispatch a new Event object and listen for it in the modal component, we have dispatched a closeModal event from this component
    document.dispatchEvent(new Event("closeModal"));
    //make sure the event is inside a parenthesis i.e "event-name" : "closeModal" in this case
  }
}

export default Form;
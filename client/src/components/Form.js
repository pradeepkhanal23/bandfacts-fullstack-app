import factsApiService from "../services/factsApiService";
import FactsList from "./FactsList";

class Form {
  constructor() {
    this.formModal = document.querySelector("#form-modal");
    this.factList = new FactsList();
    this.editMode = false;
  }

  eventHandlers() {
    //handling form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        if (this.editMode) {
          this.handleEdit(e);
        } else {
          this.handleSubmit(e);
        }
      });
    }

    document.addEventListener("outsideEditClose", () => {
      //setting the edit flag to false to cancel edit mode if the user decides to cancel and click outside
      this.editMode = false;

      //rendering the form again to have noraml submit button form when user cancels the edit mode and clicks outside
      this.render();
    });

    document.addEventListener("editModeOff", () => {
      this.editMode = false;
      this.render();
    });

    document.addEventListener("editModeOn", () => {
      //setting the edit flag to true to conditionally render the form
      this.editMode = true;

      //rendering the form to have a different display, because we have setup a conditional rendering based on the edit flag to the form
      this.render();
    });

    document.addEventListener("editFact", (e) => {
      const id = e.detail;

      this.populateEditForm(id);

      //opening the modal by dispatching the event which is being listened in modal component
      document.dispatchEvent(new Event("openModal"));
    });
  }

  clearForm() {
    this.form.elements.username.value = "";
    this.form.elements.text.value = "";
    this.form.elements.tag.value = "";
  }

  async populateEditForm(factId) {
    //calling a method in factList that fetches the fact via given id
    const fact = await this.factList.getFactById(factId);

    //filling up the form values with the fetched results
    this.form.elements.text.value = fact.text;
    this.form.elements.tag.value = fact.tag;
    this.form.setAttribute("data-id", factId);
  }

  render() {
    const usernameValue = localStorage.getItem("username") || "";
    const usernameDisabled = this.editMode ? "disabled" : "";
    const editButton = this.editMode ? "Update Fact" : "Submit";

    this.formModal.innerHTML = `
      <form id="fact-form">
            <div class="mb-4">
              <label for="username" class="text-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                class="form-input w-full"
                value="${usernameValue}"
                autocomplete="off"
                ${usernameDisabled}
              />
            </div>
            <div class="mb-4">
              <label for="text" class="text-label">Text</label>
              <textarea
                id="text"
                name="text"
                class="form-textarea w-full"
                autocomplete="off"
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="tag" class="text-label">Tag</label>
              <input
                type="text"
                id="tag"
                name="tag"
                autocomplete="off"
                class="form-input w-full"
              />
            </div>
            <div class="text-center mt-3">
              <button
                id="submitBtn"
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
              ${editButton}
              </button>
            </div>
          </form>
    
    `;

    //we put this line here because we are rendering the form via JS and the form element cannot be accessed before its created
    this.form = document.querySelector("#fact-form");
    this.eventHandlers();
  }

  //handle Submit Function
  async handleSubmit(e) {
    e.preventDefault();

    //getting the form values, we have setup the ids and names in the form to get its values
    const username = this.form.elements.username.value;
    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;

    if (username === "" || text === "" || tag === "") {
      //user validation
      alert("Please enter all the values");
      return;
    } else {
      try {
        //adding the user to the local storage
        localStorage.setItem("username", username);

        const fact = {
          username,
          text,
          tag,
        };

        //this is a response back from the api, which has an object with success:true, and data object , where the newly created fact is
        const newFact = await factsApiService.createFact(fact);

        //adding the fact to the list
        //we brought the FactsList's method here by instanciating it in the constructor , to add the newly created fact in the list and see the update on the list instantly as soon as we submit the form
        this.factList.addFactToTheList(newFact.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    //clearing the form fields
    this.clearForm();

    //rendering the form
    this.render();

    //because there is no connection between modal and form , we want a create and dispatch a new Event object and listen for it in the modal component, we have dispatched a closeModal event from this component
    document.dispatchEvent(new Event("closeModal"));
    //make sure the event is inside a parenthesis i.e "event-name" : "closeModal" in this case
  }

  async handleEdit(e) {
    e.preventDefault();

    //getting the values from the prefilled form
    const id = this.form.getAttribute("data-id");
    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;

    //checking the user input again for vaidation
    if (text === "" || tag === "") {
      alert("Please provide the edit values to update the fact");
    } else {
      try {
        //making an api call to the api service module that takes an id and data as parameter which again calls the put method from our backend routes
        await factsApiService.updateFact(id, { text, tag });

        //after updating, we fetch the facts again to see the latest updated facts list
        this.factList.getFacts();

        //once the facts are updated, we dispatch the closeModal event
        document.dispatchEvent(new Event("closeModal"));

        //we also turn off the edit Mode since we are done with the editing
        document.dispatchEvent(new Event("editModeOff"));
      } catch (error) {
        console.log(error);
        alert("Couldnt update the resource");
      }
    }
  }
}

export default Form;

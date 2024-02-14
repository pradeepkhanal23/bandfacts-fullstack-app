import FactsApiService from "../services/factsApiService";

class FactsList {
  constructor() {
    this.facts = [];
    this.cardContainer = document.querySelector("#card-container");
    this.getFacts();
    this.availableTags = new Set([
      "rock",
      "pop",
      "jazz",
      "hiphop",
      "metal",
      "punkrock",
      "reggae",
      "grunge",
    ]);
  }

  addEventListeners() {
    // ------------Handling Delete----------------------------------------
    // we are using event delegation here, as the cards are not there in the DOM , we used JS to create and render them, so we gave the responsibilty to its card container(which is card's parent) to handle the event properly
    this.cardContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-xmark")) {
        //we used stopImmediatePropagation because the event is bubbling up and it triggers the eventlisteners attached to its parent as well by default, so in order to stop that , we addded this line
        e.stopImmediatePropagation();

        //since we have added the custom data attribute in each card, we are just traversing up via target node to reach its parent node and get its data-id attribute via DOM
        const id =
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          );

        this.deleteFact(id);
      }
    });

    // ---------------------Handling Edit--------------------------------------
    // we are using event delegation here, as the cards are not there in the DOM , we used JS to create and render them, so we gave the responsibilty to its card container(which is card's parent) to handle the event properly
    this.cardContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-edit")) {
        e.stopImmediatePropagation();

        const id =
          e.target.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          );

        //we are creating a custom event on the edit button click , and we will listen for this event in the Form component, because we need to populate the form by fetching the selected card with a specific id, which we can get from getFactById(id) method, that is inside the api services module

        //also we are turning the edit mode on to handle edit operations nicely with both the form and submit button that acts different when we are in the edit mode

        // we are also passing the id as a detail to extract in in Form component
        document.dispatchEvent(
          new CustomEvent("editFact", {
            detail: id,
          })
        );
        document.dispatchEvent(new Event("editModeOn"));
      }
    });
  }

  async getFacts() {
    try {
      const res = await FactsApiService.getFacts();
      this.facts = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async getFactById(id) {
    try {
      const res = await FactsApiService.getFactById(id);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateFacts(id) {
    try {
      await FactsApiService.updateFact(id);
      this.getFacts();
      this.render();
    } catch (error) {
      alert("You can not update this resource");
    }
  }

  async deleteFact(id) {
    try {
      //deletes from the server
      await FactsApiService.deleteFact(id);

      //deleting from the DOM
      this.facts.filter((fact) => fact._id !== id);

      //fetching updated fatcs list after deletion
      this.getFacts();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this.availableTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "tag-black";
    }
    return tagClass;
  }

  addFactToTheList(fact) {
    this.facts.push(fact);
    this.render();
  }

  render() {
    let cardsHTML = ""; // instead of overwriting everytime, we initialize a varaible called cardsHTML for all cards to be accumulated and displayed
    this.facts.map((fact) => {
      const { username, text, tag, date, _id } = fact;

      // formatting the date to a specific format
      // const formattedDate = new Date().toLocaleString("en-AU");

      const tagClass = this.getTagClass(tag);

      cardsHTML += `
        <article class="card relative" data-id=${_id}>
          <div class="mb-4 flex justify-between items-center">
            <div class="flex  items-center gap-2">
              <span class="${tagClass} user-profile-box"><i class="fa-regular fa-user"></i></span>
              <span class="user-name ">${username}</span>
            </div>
            ${
              username === localStorage.getItem("username")
                ? `<button class="btn-delete cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>`
                : ""
            }
            ${
              username === localStorage.getItem("username")
                ? `<button class="btn-edit cursor-pointer">
              <i class="fa-solid fa-edit"></i>
            </button>`
                : ""
            }
          </div>
          <p class="paragraph mb-3 ">${text}</p>
          <span class="tag ${tagClass}">${tag}</span>
          <div class="mt-3 flex items-center gap-2">
            <h4 class="text-nowrap"> Posted on</h4><span class="timestamp">${date}</span>
          </div>
        </article>
    `;
    });

    // Set the innerHTML of the container after all cards have been processed
    this.cardContainer.innerHTML = cardsHTML;

    //we add the event listeners only after the card is rendered
    this.addEventListeners();
  }
}

export default FactsList;

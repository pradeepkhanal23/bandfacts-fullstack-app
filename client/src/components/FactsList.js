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

  async deleteFact(id) {
    try {
      //deletes from the server
      await FactsApiService.deleteFact(id);

      //deleting from the DOM
      this.facts.filter((fact) => fact._id !== id);
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

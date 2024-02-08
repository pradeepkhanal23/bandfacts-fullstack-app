import { facts } from "../data";

class FactsList {
  constructor() {
    this.facts = facts;
    this.cardContainer = document.querySelector("#card-container");
    this.availableTags = new Set([
      "rock",
      "pop",
      "jazz",
      "hiphop",
      "rnb",
      "metal",
      "punk",
      "reggae",
      "classic",
      "funk",

      "folk",
    ]);
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

  render() {
    let cardsHTML = ""; // instead of overwriting everytime, we initialize a varaible called cardsHTML for all cards to be accumulated and displayed
    this.facts.map((fact) => {
      const { username, text, tag, date } = fact;
      const tagClass = this.getTagClass(tag);

      cardsHTML += `
        <article class="card relative">
          <div class="mb-4 flex justify-between">
            <div class="flex  items-center gap-2">
              <span class="${tagClass} user-profile-box"><i class="fa-regular fa-user"></i></span>
              <span class="user-name">${username}</span>
            </div>
            <span class="timestamp">${date}</span>
            <button class="btn-delete cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <p class="paragraph mb-3">${text}</p>
          <span class="tag ${tagClass}">${tag}</span>
        </article>
    `;
    });

    // Set the innerHTML of the container after all cards have been processed
    this.cardContainer.innerHTML = cardsHTML;
  }
}

export default FactsList;

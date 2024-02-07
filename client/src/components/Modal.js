class Modal {
  constructor() {
    this.modalBtn = document.querySelector("#create-btn");
    this.modal = document.querySelector("#myModal");
    this.eventHandlers();
  }

  eventHandlers() {
    this.modalBtn.addEventListener("click", this.open.bind(this));
    this.modal.addEventListener("click", this.outsideClose.bind(this));
  }

  outsideClose(e) {
    if (e.target === this.modal) {
      this.close();
    }
  }

  open() {
    this.modal.style.display = "flex";
  }

  close() {
    this.modal.style.display = "none";
  }
}

module.exports = Modal;

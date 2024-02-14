class Modal {
  constructor() {
    this.modalBtn = document.querySelector("#create-btn");
    this.modal = document.querySelector("#myModal");
    this.eventHandlers();
  }

  eventHandlers() {
    this.modalBtn.addEventListener("click", this.open.bind(this));
    this.modal.addEventListener("click", this.outsideClose.bind(this));
    document.addEventListener("closeModal", () => {
      this.close();
    });
    document.addEventListener("openModal", () => {
      this.open();
    });
  }

  outsideClose(e) {
    if (e.target === this.modal) {
      this.close();

      document.dispatchEvent(new Event("outsideEditClose"));
    }
  }

  open() {
    this.modal.style.display = "flex";
  }

  close() {
    this.modal.style.display = "none";
  }
}

export default Modal;

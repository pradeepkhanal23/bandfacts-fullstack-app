import "./style.css";
import Modal from "./components/Modal";
import Form from "./components/Form";
import FactsList from "./components/FactsList";

const modal = new Modal();
const form = new Form();
form.render();

const factsList = new FactsList();
factsList.render();

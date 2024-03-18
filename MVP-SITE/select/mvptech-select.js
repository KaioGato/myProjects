const firebaseConfig = {
      apiKey: "AIzaSyDHMgU_pwQePAoPRtglxW1oTfq3pXu2pe4",
      authDomain: "mvp-tech-e85d9.firebaseapp.com",
      projectId: "mvp-tech-e85d9",
      storageBucket: "mvp-tech-e85d9.appspot.com",
      messagingSenderId: "92291896767",
      appId: "1:92291896767:web:ab78ed7e276fab81a8bd0a",
      measurementId: "G-FQ0G4P2ZWE"
    };
 firebase.initializeApp(firebaseConfig);

const componentsContainer = document.getElementById("components-container");
const createNewComponentBtn = document.getElementById("create-new-component-btn");
const componentNameInput = document.getElementById("component-name");

let componentCount = 1;

createNewComponentBtn.addEventListener("click", () => {
  const componentName = componentNameInput.value.trim();
  if (componentName) {
    createNewComponent(componentName);
    componentNameInput.value = "";
  }
});

function createNewComponent(componentName) {
  const componentId = `component-${componentCount++}`;
  const component = document.createElement("div");
  component.classList.add("component");
  component.id = componentId;

  const componentNameElement = document.createElement("h2");
  componentNameElement.textContent = componentName;
  component.appendChild(componentNameElement);
  
  const seeMoreLabel = document.createElement("label");
  seeMoreLabel.classList.add("seeMore-label");
  seeMoreLabel.id = `moni-${componentId}`;
  seeMoreLabel.style.display = "none"; // Inicialmente oculto

  const  firebasetext = document.createElement("text");
  firebasetext.id = `text-${componentId}`;
  firebasetext.style.display = "flex"; // Inicialmente oculto


  const seeMoreButton = document.createElement("button");
  seeMoreButton.classList.add("seeMore-btn");
  seeMoreButton.textContent = "Ver mais";
  seeMoreButton.addEventListener("click", () => {
    toggleComponentMonitoration(componentId);
  });

  const onOffButton = document.createElement("button");
  onOffButton.classList.add("on-off-btn");
  onOffButton.textContent = "On/Off";
  onOffButton.addEventListener("click", () => {
    toggleComponentState(componentId);
  });

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => {
    editComponentName(componentId);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Excluir";
  deleteButton.addEventListener("click", () => {
    deleteComponent(componentId);
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsContainer.appendChild(onOffButton);
  buttonsContainer.appendChild(seeMoreButton);
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);
  component.appendChild(buttonsContainer);

  componentsContainer.appendChild(component);
  componentsContainer.appendChild(seeMoreLabel);
  seeMoreLabel.appendChild(firebasetext);
  
}

function toggleComponentState(componentId) {
  const component = document.getElementById(componentId);
  component.classList.toggle("component-on");
  const stateMessage = component.classList.contains("component-on") ? "ativado" : "desativado";
  const databaseRef = firebase.database().ref(`componentes/${componentId}/state`);
  databaseRef.set(component.classList.contains("component-on"));
  showDatabaseState(databaseRef);
}

function showDatabaseState(databaseRef) {
  databaseRef.once("value", (snapshot) => {
    const state = snapshot.val();
    const stateMessage = state ? "ativado" : "desativado";
    alert(`O componente está ${stateMessage} no Realtime Database.`);
  });
}

function toggleComponentMonitoration(componentId) {
  const label = document.getElementById(`moni-${componentId}`);
  const text = document.getElementById(`text-${componentId}`);

  if (label.style.display === "none") {
    label.style.display = "inline-block";
    
  } else {
    label.style.display = "none";
  }
	
  const databaseRef = firebase.database().ref(`componentes/${componentId}/execucao`);
  databaseRef.on("value", snapshot => {
    const value = snapshot.val();
    text.textContent = value;
    label.style.top = "-60px";
  });
}

function editComponentName(componentId) {
  const component = document.getElementById(componentId);
  const componentNameElement = component.querySelector("h2");
  const newComponentName = prompt("Digite o novo nome do componente:", componentNameElement.textContent);
  if (newComponentName) {
    componentNameElement.textContent = newComponentName;
  }
}

function deleteComponent(componentId) {
  if (confirm("Tem certeza que deseja excluir este componente?")) {
    const component = document.getElementById(componentId);
    component.remove();
    const label = document.getElementById(`moni-${componentId}`);
    label.remove();
  }
}
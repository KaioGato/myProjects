 const firebaseConfig = {
        apiKey: "AIzaSyAf7lPo2WVwNaHZUEoaaRAOCpcVtDY5ADk",
        authDomain: "mvp-tech-90e7b.firebaseapp.com",
        databaseURL: "https://mvp-tech-90e7b-default-rtdb.firebaseio.com",
        projectId: "mvp-tech-90e7b",
        storageBucket: "mvp-tech-90e7b.appspot.com",
        messagingSenderId: "221450960297",
        appId: "1:221450960297:web:266a2260defcbab180d8b8",
        measurementId: "G-4B1239EM0C"
    };
    firebase.initializeApp(firebaseConfig);

     // Cria uma referência para o nó do Realtime Database
    const databaseRef = firebase.database().ref("comando");

    // Adiciona um ouvinte de eventos para o nó
    databaseRef.on("value", snapshot => {
    // Acessa o valor atual do nó
    const value = snapshot.val();
  
    // Atualiza o texto da label com o valor obtido
    const label = document.getElementById("my-label");
    label.innerText = value;
    });


    const db = firebase.database();
    const nodeRef = db.ref("comando");
    const toggleButton = document.getElementById("toggleButton");
    toggleButton.addEventListener("click", function() {
      nodeRef.transaction(function(currentValue) {
        return !currentValue;
      }, function(error, committed, snapshot) {
        if (error) {
          console.error("Erro ao alterar estado: " + error);
        } else if (!committed) {
          console.warn("Alteração não confirmada.");
        } else {
          console.log("Estado alterado com sucesso. Novo valor: " + snapshot.val());
        }
      });
    });

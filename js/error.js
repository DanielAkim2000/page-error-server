// Fonction d'animation du fond
function animateBackground() {
  const body = document.body;
  let saturation = 20;
  let increasing = true;

  setInterval(() => {
    if (increasing) {
      saturation += 1;
      if (saturation >= 30) increasing = false;
    } else {
      saturation -= 1;
      if (saturation <= 20) increasing = true;
    }

    body.style.background = `linear-gradient(135deg, hsl(224, ${saturation}%, 20%), hsl(224, ${saturation}%, 30%))`;
  }, 100);
}

// Animation personnalisée pour chaque type d'erreur
function initializeErrorAnimations() {
  // Détecter le type d'erreur par la classe du body
  const bodyClasses = document.body.classList;

  if (bodyClasses.contains("error-500")) {
    initializeError500Animation();
  } else if (bodyClasses.contains("error-502")) {
    initializeError502Animation();
  } else if (bodyClasses.contains("error-503")) {
    initializeError503Animation();
  } else if (bodyClasses.contains("error-504")) {
    initializeError504Animation();
  }
}

// Animation pour l'erreur 500
function initializeError500Animation() {
  const server = document.querySelector(".server");

  // Crée des étincelles aléatoires
  function createSparks() {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.style.position = "absolute";
        spark.style.width = "3px";
        spark.style.height = "3px";
        spark.style.backgroundColor = "yellow";
        spark.style.borderRadius = "50%";
        spark.style.top = `${Math.random() * 100 + 30}px`;
        spark.style.left = `${Math.random() * 80 + 20}px`;
        spark.style.opacity = "1";

        server.appendChild(spark);

        // Animation de disparition de l'étincelle
        setTimeout(() => {
          spark.style.transition = "all 0.5s ease";
          spark.style.opacity = "0";
          spark.style.transform = "translateY(-10px)";

          setTimeout(() => {
            server.removeChild(spark);
          }, 500);
        }, 200);
      }
    }, 300);
  }

  createSparks();
}

// Animation pour l'erreur 502
function initializeError502Animation() {
  const gateway = document.querySelector(".gateway");
  const packetElement = document.querySelector(".packet");
  const connection = document.querySelector(".connection");

  // Ajouter plusieurs paquets pour une animation plus riche
  function addExtraPackets() {
    // Supprimer les paquets existants sauf le premier
    const existingPackets = document.querySelectorAll(
      ".packet:not(:first-child)"
    );
    existingPackets.forEach((packet) => packet.remove());

    // Créer 2 nouveaux paquets supplémentaires avec des délais différents
    for (let i = 0; i < 2; i++) {
      const newPacket = document.createElement("div");
      newPacket.className = "packet";
      newPacket.style.animationDelay = `${(i + 1) * 1}s`;
      connection.appendChild(newPacket);
    }
  }

  // Ajouter un effet de scintillement aux serveurs
  function addServerFlicker() {
    const gatewayLeft = document.querySelector(".gateway-left");
    const gatewayRight = document.querySelector(".gateway-right");

    setInterval(() => {
      // Effet de scintillement pour le serveur gauche
      if (Math.random() > 0.7) {
        gatewayLeft.style.opacity = "0.5";
        setTimeout(() => {
          gatewayLeft.style.opacity = "1";
        }, 100);
      }

      // Effet de scintillement pour le serveur droit
      if (Math.random() > 0.7) {
        gatewayRight.style.opacity = "0.5";
        setTimeout(() => {
          gatewayRight.style.opacity = "1";
        }, 150);
      }
    }, 800);
  }

  // Effet de connexion interrompue
  function connectionFailEffect() {
    setInterval(() => {
      if (Math.random() > 0.7) {
        connection.style.opacity = "0.3";
        setTimeout(() => {
          connection.style.opacity = "1";
        }, 200);
      }
    }, 2000);
  }

  // Initialiser les animations
  addExtraPackets();
  addServerFlicker();
  connectionFailEffect();
}

// Animation pour l'erreur 503
function initializeError503Animation() {
  // Rendant l'animation légèrement aléatoire
  const worker = document.querySelector(".worker");

  setInterval(() => {
    if (Math.random() > 0.7) {
      worker.style.transform = "translateX(5px)";
      setTimeout(() => {
        worker.style.transform = "translateX(0)";
      }, 200);
    }
  }, 1000);
}

// Animation pour l'erreur 504
function initializeError504Animation() {
  const hourglass = document.querySelector(".hourglass");

  hourglass.addEventListener("click", () => {
    // Recommencer l'animation en ajoutant temporairement une classe
    hourglass.classList.add("restart");

    setTimeout(() => {
      hourglass.classList.remove("restart");
    }, 100);

    // Effet de vibration
    hourglass.style.animation = "shake 0.5s ease";
    setTimeout(() => {
      hourglass.style.animation = "";
    }, 500);
  });
}

// Ajout d'une animation de tremblement pour l'effet de clic
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .hourglass.restart .sand {
            animation: sand-grow 8s linear infinite;
            animation-play-state: running;
        }
        
        .hourglass.restart .sand-stream {
            animation: sand-flow 8s linear infinite;
            animation-play-state: running;
        }
        
        .spark {
            animation: spark 0.5s ease-out;
        }
        
        @keyframes spark {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.5); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
        }
    </style>
`
);

// Fonction d'initialisation principale
function initializeErrorPage() {
  // Animer l'arrière-plan
  animateBackground();

  // Initialiser les animations spécifiques aux erreurs
  initializeErrorAnimations();

  // Ajouter des effets de survol pour les boutons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.transform = "translateY(-5px)";
      button.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
    });

    button.addEventListener("mouseout", () => {
      button.style.transform = "";
      button.style.boxShadow = "";
    });
  });
}

// Initialiser lorsque la page est chargée
document.addEventListener("DOMContentLoaded", initializeErrorPage);

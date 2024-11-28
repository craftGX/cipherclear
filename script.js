// Lien de votre site
const siteLink = "https://votre-site.com"; // Remplacez cela par l'URL de votre site

// Fonction de cryptage et décryptage avec le chiffrement de César
function caesarCipher(str, shift) {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Vérifie si le caractère est une lettre majuscule
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
      }
      // Vérifie si le caractère est une lettre minuscule
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
      }
      // Retourne le caractère inchangé
      return char;
    })
    .join("");
}

// Fonction pour désactiver les boutons
function disableButtons() {
  document.getElementById("encryptButton").disabled = true;
  document.getElementById("decryptButton").disabled = true;
}

// Écouteur d'événements pour le bouton de cryptage
document.getElementById("encryptButton").addEventListener("click", function () {
  const text = document.getElementById("monTexte").value;
  const shift = parseInt(document.getElementById("monChiffre").value);

  // Vérifie si le texte et le chiffre sont valides
  if (text && !isNaN(shift)) {
    const encryptedText = caesarCipher(text, shift);
    document.getElementById("monTexte").value = encryptedText; // Affiche le texte crypté
    updateShareLinks(encryptedText); // Met à jour les liens avec le texte crypté
    disableButtons(); // Désactive les boutons après l'action
  }
});

// Écouteur d'événements pour le bouton de décryptage
document.getElementById("decryptButton").addEventListener("click", function () {
  const text = document.getElementById("monTexte").value;
  const shift = parseInt(document.getElementById("monChiffre").value);

  // Vérifie si le texte et le chiffre sont valides
  if (text && !isNaN(shift)) {
    const decryptedText = caesarCipher(text, -shift); // Utilise un décalage négatif pour déchiffrer
    document.getElementById("monTexte").value = decryptedText; // Affiche le texte décrypté
    updateShareLinks(decryptedText); // Met à jour les liens avec le texte décrypté
    disableButtons(); // Désactive les boutons après l'action
  }
});

// Mettre à jour les liens pour envoyer des messages via Gmail et WhatsApp
function updateShareLinks(encryptedText) {
  const gmailButton = document.getElementById("gmailButton");
  const whatsappButton = document.getElementById("whatsappButton");

  // Met à jour le lien Gmail
  gmailButton.href = `mailto:example@gmail.com?subject=Message Crypté&body=${encodeURIComponent(
    encryptedText
  )}%0A%0A${encodeURIComponent(siteLink)}`;

  // Met à jour le lien WhatsApp
  whatsappButton.href = `https://wa.me/?text=${encodeURIComponent(
    encryptedText
  )}%0A%0A${encodeURIComponent(siteLink)}`;
}

import React from 'react';
import Lightbox from './Lightbox';

const Registration = ({ }) => {
  return (
    <Lightbox
      name="onboardingMessages"
      title="La messagerie"
    >

      <p>Tu es dans la section messagerie d'owo. En cliquant sur le bouton de menu en haut à gauche, tu peux choisir ton interlocuteur. </p>

      <p><b>🤖 L'assistant Owo</b> est présent pour t'aider à rédiger et publier une offre. Éventuellement, il pourra aussi te guider dans tes recherches et te suggérer des connexions basées sur tes intérêts 🌐.</p>

      <p>Remarque que <b>Véronique d'owo</b> 💁‍♀️ est aussi disponible. Elle est là pour recueillir tes commentaires 📝. On souhaite vraiment savoir ce que tu penses, même si c'est pour nous dire qu'il y a des choses à améliorer.</p>

      <p>Merci de faire partie de cette aventure 🚀. </p>

    </Lightbox>
  );
}

export default Registration;

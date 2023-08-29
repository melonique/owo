import React from 'react';
import Lightbox from './Lightbox';

const Registration = ({ }) => {
  return (
    <Lightbox
      name="onboardingListings"
      title="Le marché"
    >
      <p>Te voilà dans le catalogue d'annonces de tes voisins.</p>
      <h5>Ce qui distingue les annonces owo</h5>
      <ul>
        <li><b>Ultra-local</b> : Puisque c'est la Bêta Habitus 🌿, tu ne verras que des annonces de résidents de Habitus. À l'avenir, seules les annonces dans un rayon de 2 km à pied seront présentées.</li>
        <li><b>Rédigés à l'aide de AI</b> : Les annonces sont documentées à l'aide de l'assistant owo 🤖</li>
        <li><b>Recherche intelligente</b> : La recherche utilise l'intelligence artificielle pour présenter les résultats les plus pertinents, peu importe les mots que tu utilises. Cela te permet aussi d'être très détaillé dans ta recherche.</li>
      </ul>

      <p>Si tu as des suggestions ou veux nous donner des commentaires sur ton expérience avec les annonces, <a href="#">écris-nous ici</a> !</p>

      <p>Et n'oublie pas, si une annonce t'interpelle, clique simplement sur le bouton avec la bulle 🗨️ pour entrer en contact avec son auteur. L'échange, le partage et la découverte n'ont jamais été aussi simples !</p>

    </Lightbox>
  );
}

export default Registration;

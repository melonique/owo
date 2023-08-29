import React from 'react';
import Lightbox from './Lightbox';

const Registration = ({ }) => {
  return (
    <Lightbox
      name="onboardingListings"
      title="🌟 Bienvenue dans les annonces owo ! 🌟"
    >

      <p>Plonge dans un univers d'opportunités juste à ta porte. Ici, notre intelligence artificielle t'accompagne pour te proposer des annonces adaptées à tes besoins. Navigue à travers nos catégories de base pour découvrir tout ce que la communauté a à offrir.</p>

      <h5>🔍 Petits rappels pour optimiser ta recherche :</h5>
      <ul>
        <li><b>Intelligence Artificielle</b> : Notre système apprend de tes préférences pour te suggérer des annonces qui te correspondent le mieux.</li>
        <li><b>Catégories de base</b> : Commence par explorer ces catégories pour avoir une idée générale de ce qui est disponible.</li>
      </ul>

      <p>Et n'oublie pas, si une annonce t'interpelle, clique simplement sur le bouton avec la bulle 🗨️ pour entrer en contact avec son auteur. L'échange, le partage et la découverte n'ont jamais été aussi simples !</p>

    </Lightbox>
  );
}

export default Registration;

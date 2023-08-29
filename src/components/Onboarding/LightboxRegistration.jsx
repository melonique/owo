import Link from 'next/link'
import React from 'react';
import Lightbox from './Lightbox';

const Registration = ({ }) => {
  return (
    <Lightbox
      name="onboardingRegistration"
      title="🌿 Bienvenue dans la Bêta d'owo - Édition Habitus ! 🌿"
    >

      <p>Salut ! 😊</p>

      <p>Tu viens de rejoindre owo à un moment très spécial! <br /><br />Actuellement, l'application est peuplée uniquement par les habitants de Habitus et par ceux qui contribuent activement à la construction de cette plateforme. C'est une occasion unique d'échanger avec des voisins proches, donnant à chaque objet une nouvelle histoire et renforçant les liens de notre communauté.</p>

      <h5>🔍 <b>Ce qui nous rend uniques :</b></h5>
      <ul>
        <li><b>Proximité</b> : Nos annonces sont ultra-locales, à une distance à pied. Cela augmente la sécurité, renforce notre sentiment d'appartenance et crée une communauté plus soudée.</li>
        <li><b>Exclusivité</b> : En étant dans cette phase bêta, tu es aux premières loges de l'évolution d'owo ! Tu peux voir<a href="https://owo.quebec/beta/habitus#future" target="_blank"> sur quoi on travail ici! </a></li>
        <li><b>Ton avis compte !</b> Nous valorisons ton feedback. N'hésite pas à nous faire part de tes impressions et suggestions <a href="#">ici</a>.</li>
      </ul>

      <h5>🌟 <b>Pour bien démarrer :</b></h5>
      <ol>
        <li><Link href="/listings">Jette un œil aux annonces </Link>: découvre ce que tes voisins proposent ou recherchent.</li>
        <li><Link href="/messages/offer">Annonce un bien ou service </Link>: partage ce que tu as à offrir à la communauté.</li>
      </ol>

      <p><b>Reste connecté !</b> Nous avons plein de nouveautés à venir. N'hésite pas à consulter <a href="#">ce lien</a> pour découvrir ce qui t'attend. </p>

      <p>Chaque geste compte pour réduire notre impact écologique et renforcer les liens de proximité. Es-tu prêt à te lancer dans cette belle aventure d'économie circulaire avec nous ?</p>

      <p>À très vite sur owo, et ensemble, rendons notre consommation plus responsable et notre quartier plus uni ! 🌍💚</p>

      <p>Ton équipe owo. 🌱</p>


    </Lightbox>
  );
}


export default Registration;

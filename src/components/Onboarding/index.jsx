import React from 'react';
import { useRouter } from "next/router"
import { useUi } from '@/contexts/UiContext'

import LightboxRegistration from './LightboxRegistration';
import LightboxListings from './LightboxListings';
import LightboxMessages from './LightboxMessages';



const Onboarding = ({}) => {
  const { uiState } = useUi();
  const {route} = useRouter();
  const routeBase = route.split('/')[1];

  return (<>{route}
    {!uiState.onboardingRegistration && routeBase == 'profile' && <LightboxRegistration />}
    {!uiState.onboardingListings && routeBase == 'listings' && <LightboxListings />}
    {!uiState.onboardingMessages && routeBase == 'messages' && <LightboxMessages />}
  </>
  );
}

export default Onboarding;

import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from "next/router"
import { useUi } from '@/contexts/UiContext'

import LightboxRegistration from './LightboxRegistration';
import LightboxListings from './LightboxListings';



const Onboarding = ({}) => {
  const { uiState } = useUi();
  const {route} = useRouter();

  return (<>
    {!uiState.onboardingRegistration && route == 'profile' && <LightboxRegistration />}
    {!uiState.onboardingListings && route == 'listings' && <LightboxListings />}
  </>
  );
}

Onboarding.propTypes = {};

export default Onboarding;

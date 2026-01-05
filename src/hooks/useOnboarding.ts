import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'forza_onboarding_complete';

export const useOnboarding = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // TEMP: Reset to show splash screen - remove this line after testing
    localStorage.removeItem(ONBOARDING_KEY);
    const completed = localStorage.getItem(ONBOARDING_KEY) === 'true';
    setHasCompletedOnboarding(completed);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setHasCompletedOnboarding(true);
  };

  return {
    hasCompletedOnboarding,
    completeOnboarding,
    isLoading: hasCompletedOnboarding === null,
  };
};

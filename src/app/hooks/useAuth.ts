import { useEffect, useState } from 'react';
import { getUserInfo, isAllowedToChat } from '@/app/lib/storage';
import { getWelcomeMessage } from '@/app/utils/messages';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [initialMessage, setInitialMessage] = useState<{ role: 'buddha'; content: string } | null>(null);

  useEffect(() => {
    const { username, language } = getUserInfo();
    const allowed = isAllowedToChat();

    if (!username || !allowed) {
      window.location.replace('/');
    } else {
      const welcomeMessage = getWelcomeMessage(language, username);
      setInitialMessage({ role: 'buddha', content: welcomeMessage });
      setLoading(false);
    }
  }, []);

  return { loading, initialMessage };
};

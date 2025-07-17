export function getUserInfo() {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return {
      username: '',
      gender: 'Male',
      language: 'English',
    };
  }
  
  return {
    username: localStorage.getItem('username') || '',
    gender: localStorage.getItem('gender') || 'Male',
    language: localStorage.getItem('language') || 'English',
  };
}

export function isAllowedToChat(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem('allowed') === 'true';
}

export function saveUserInfo({
  username,
  gender,
  language,
}: {
  username: string;
  gender: string;
  language: string;
}) {
  localStorage.setItem('username', username);
  localStorage.setItem('gender', gender);
  localStorage.setItem('language', language);
}

export function allowChat() {
  sessionStorage.setItem('allowed', 'true');
}

const welcomeMessages: Record<string, string> = {
    English: "Welcome, {name}. Ask me anything, and I shall reflect with you.",
    Spanish: "Bienvenido, {name}. Pregúntame lo que quieras, y reflexionaré contigo.",
    French: "Bienvenue, {name}. Pose-moi une question, et je réfléchirai avec toi.",
    German: "Willkommen, {name}. Stelle mir eine Frage, und ich werde mit dir reflektieren.",
    Italian: "Benvenuto, {name}. Chiedimi qualsiasi cosa e rifletterò con te.",
    Portuguese: "Bem-vindo, {name}. Pergunte-me qualquer coisa e eu refletirei com você.",
    Japanese: "ようこそ、{name}さん。何でも聞いてください。一緒に考えましょう。",
    Korean: "환영합니다, {name}님. 무엇이든 물어보세요. 함께 성찰하겠습니다.",
    Chinese: "欢迎你，{name}。你可以问我任何问题，我会与你一同思考。",
    Arabic: "مرحبًا، {name}. اسألني ما تشاء وسأتأمل معك.",
    Hindi: "स्वागत है, {name}. मुझसे कुछ भी पूछें, मैं आपके साथ चिंतन करूंगा।",
    Russian: "Добро пожаловать, {name}. Задай мне любой вопрос, и я поразмышляю вместе с тобой.",
  };

const placeholderMessages: Record<string, string> = {
    English: "Ask Buddha something...",
    Spanish: "Pregúntale algo a Buda...",
    French: "Demande quelque chose à Bouddha...",
    German: "Frage Buddha etwas...",
    Italian: "Chiedi qualcosa a Buddha...",
    Portuguese: "Pergunte algo ao Buda...",
    Japanese: "ブッダに何か聞いてみて...",
    Korean: "부처님께 무언가 물어보세요...",
    Chinese: "问佛祖一些事情...",
    Arabic: "اسأل بوذا شيئًا...",
    Hindi: "बुद्ध से कुछ पूछें...",
    Russian: "Спроси что-нибудь у Будды...",
  };
  
  export function getWelcomeMessage(language: string, name: string): string {
    const template = welcomeMessages[language] || welcomeMessages['English'];
    return template.replace('{name}', name);
  }

  export function getPlaceholderMessage(language: string): string {
    return placeholderMessages[language] || placeholderMessages['English'];
  }
  
# Recharge Authentication System

A web application for collecting and managing recharge information, with email integration for submissions.

## Features

- User-friendly form with five key input fields:
  - Type of recharge (dropdown selection)
  - Price of recharge (number input)
  - Recharge code (text input with show/hide toggle)
  - Email address (email input with validation)
  - Option to hide code (yes/no selection)
- Form validation for all fields
- Email submission capability (backend implementation required)
- Responsive design for all device sizes
- Professional header and footer components

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── AuthForm.tsx
│   ├── FormInput.tsx
│   └── FormSelect.tsx
├── pages/
│   └── HomePage.tsx
├── services/
│   └── emailService.ts
├── App.tsx
└── main.tsx
```

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Envoi des e-mails

Le formulaire appelle l'API Express `/api/send-email`, qui envoie ensuite le message avec Nodemailer.

1. Configurez `EMAIL_USER` et `EMAIL_PASS` sur le serveur en suivant `server/.env.example`.
2. `EMAIL_PASS` doit être un mot de passe d'application Gmail, pas le mot de passe du compte.
3. Configurez facultativement `EMAIL_TO` si le destinataire diffère de `EMAIL_USER`.
4. Si le frontend et l'API sont déployés séparément, configurez `VITE_API_URL` au moment du build du frontend avec l'URL publique de l'API, sans slash final.

En développement, Vite transmet automatiquement les requêtes `/api` au serveur local sur le port 4001.

### Déploiement Netlify

Le fichier `netlify.toml` construit le frontend et redirige `/api/send-email` vers la Function Netlify correspondante. Dans **Site configuration > Environment variables**, ajoutez :

- `EMAIL_USER` : l'adresse Gmail utilisée pour l'envoi ;
- `EMAIL_PASS` : un mot de passe d'application Google (16 caractères), jamais le mot de passe habituel ;
- `EMAIL_TO` : l'adresse qui reçoit les soumissions (facultatif, `EMAIL_USER` par défaut).

Ne configurez pas `VITE_API_URL` sur Netlify : le frontend et la Function utilisent le même domaine. Après toute modification des variables, lancez un nouveau déploiement afin qu'elles soient prises en compte.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React for icons
- (Backend reference: Express, Nodemailer)

## Future Enhancements

- User authentication and login
- History of submitted recharge information
- Admin dashboard for managing submissions
- Email verification for users
- Multiple language support

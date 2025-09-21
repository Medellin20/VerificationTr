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

## Backend Implementation

This project includes a reference implementation for a Node.js backend with Express and Nodemailer in the `server/index.js` file. To implement the email functionality:

1. Create a separate Node.js project or add server code to this project
2. Install required dependencies: express, cors, nodemailer, dotenv
3. Set up environment variables for email credentials
4. Update the `emailService.ts` file to make actual API calls to your server

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
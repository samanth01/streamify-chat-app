# Streamify

Streamify is a full-stack web application for language learners to connect, chat, and practice with partners worldwide. It features real-time messaging, video calls, friend requests, onboarding, and customizable themes.

---

## Features

- **User Authentication**: Sign up, log in, onboarding flow.
- **Profile & Onboarding**: Set up your profile, languages, and bio.
- **Friend System**: Send, accept, and manage friend requests.
- **Chat & Video Calls**: Real-time messaging and video calls using Stream API.
- **Notifications**: See incoming and accepted friend requests.
- **Theme Selector**: Choose from multiple UI themes (DaisyUI + TailwindCSS).
- **Responsive UI**: Modern, mobile-friendly interface.

---

## Tech Stack

- **Frontend**: React, Vite, Zustand, DaisyUI, TailwindCSS, React Router, React Query, Stream Chat/Video SDK
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Stream Chat SDK
- **Other**: Axios, React Hot Toast

---

## Project Structure

```
streamify/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── package.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Stream API credentials ([get from getstream.io](https://getstream.io/))

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/streamify.git
cd streamify
```

### 2. Setup Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories.

#### `backend/.env`

```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

#### `frontend/.env`

```
VITE_STREAM_API_KEY=your_stream_api_key
```

### 3. Install Dependencies

```sh
npm install
npm run build
```

This will install dependencies for both frontend and backend.

### 4. Run the App

#### Development

Open two terminals:

**Backend:**
```sh
cd backend
npm run dev
```

**Frontend:**
```sh
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

#### Production

```sh
npm run build
npm run start
```

---

## Usage

- Visit the frontend URL.
- Sign up and complete onboarding.
- Search for friends, send/accept requests, chat, and start video calls.

---

## Customization

- **Themes:** Easily switch UI themes using the theme selector in the navbar.
- **Languages:** Add more languages in [`LANGUAGES`](frontend/src/constants/index.js).

---

## License

MIT

---

## Credits

- [Stream Chat & Video](https://getstream.io/)
- [DaisyUI](https://daisyui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)


# Tour Connect

An online marketplace where travelers can discover and book tours, activities, and attractions offered by local operators and providers.

## Project Structure

The project is divided into three main parts:

1. **Frontend**: Built with Nuxt 3, located in the `nuxt-frontend` directory.
2. **Backend**: Built with Express.js, located in the `express-backend` directory.
3. **Shared**: TypeScript types shared across the frontend and backend.

## Setup

### Prerequisites

- Node.js (v16 or higher)
- Docker (optional, for containerized deployment)

### Installation

To get started, clone the repository:

```sh
git clone https://github.com/DulanHewage/tour-connect.git
cd tour-connect
```

#### Development

1. Install dependencies and run the backend development server:

```sh
cd express-backend
npm install
npm run dev
```

2. Install dependencies and run the frontend development server:

```sh
cd nuxt-frontend
npm install
npm run dev
```

#### Production

To build and start the production servers, follow these steps:

1. Start the frontend server:

```sh
# In the root folder, run:
npm run start:client
```

2. Start the backend server:

```sh
# In the root folder, run:
npm run start:server
```

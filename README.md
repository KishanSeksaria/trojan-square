# Trojan Square - Your One Stop for All Things USC

Welcome to Trojan Square, a comprehensive platform designed specifically for USC students. This Next.js-powered application aims to enhance the USC student experience by providing essential services and tools in one place.

## Features

### Ask USC AI
Get instant answers to your USC-related questions! Our AI-powered assistant can help you with:
- Campus information
- Academic policies
- Student services
- General USC-related inquiries

The AI system uses Retrieval-Augmented Generation (RAG) to provide accurate, USC-specific information.

### USC Marketplace
A dedicated marketplace for USC students to:
- Buy and sell textbooks
- Exchange dorm essentials
- Trade USC merchandise
- Post and find student items

## Technology Stack

Trojan Square is built with modern web technologies:

- **Frontend**: Next.js 15 with React 19
- **Styling**: TailwindCSS 4 with Shadcn UI components
- **Backend**:
  - Convex DB for real-time data synchronization
  - Prisma with PostgreSQL + pgvector for vector database storage
- **AI Models**:
  - Google Gemini 2.0 Flash for chat functionality
  - Local HuggingFace embeddings model (all-MiniLM-L6-v2)
- **Authentication**: Clerk Authentication
- **Development Tools**:
  - TypeScript
  - ESLint & Prettier for code quality
  - PNPM as package manager

## Prerequisites

Before you start, make sure you have the following installed:
- Node.js 20.x or later
- PNPM package manager
- PostgreSQL database with pgvector extension enabled
- Convex account (for database functionality)

## Environment Setup

1. Create a `.env` file in the project root with the following variables:
```
KNOWLEDGE_BASE_URL=postgresql://<username>:<password>@localhost:5432/<database>
```

2. Create a `.env.local` file in the project root with the following variables:
```
# Convex
CONVEX_DEPLOYMENT=<your_convex_deployment>
NEXT_PUBLIC_CONVEX_URL=<your_convex_url>

# AI API Keys
GOOGLE_GENERATIVE_AI_API_KEY=<your_google_api_key>
FIRECRAWL_API_KEY=<your_firecrawl_api_key>
EXA_API_KEY=<your_exa_api_key>

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
CLERK_CONVEX_ISSUER_URL=<your_clerk_issuer_url>
CLERK_CONVEX_PUBLISHABLE_KEY=<your_clerk_convex_publishable_key>
CLERK_WEBHOOK_SECRET=<your_clerk_webhook_secret>
```

3. No need to create a separate `.env.convex.local` file as the Convex deployment information is already included in the `.env.local` file.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Generate Prisma client:
```bash
pnpm prisma generate
```

3. Initialize Convex (first-time setup):
```bash
pnpm dlx convex dev
```
   - This will create your Convex project if you don't have one
   - Follow the prompts to log in and create a new deployment

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. To deploy your Convex functions:
```bash
pnpm dlx convex deploy
```

## Project Structure

```
trojan-square/
├── src/                   # Application source code
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API endpoints
│   │   │   ├── chat/      # Chat API
│   │   ├── chat/          # Chat interface pages
│   |   │   ├── chatId/    # Specific Chat page
│   │   └── marketplace/   # Marketplace pages
│   ├── components/        # React components
│   │   └── ui/            # UI components (Shadcn UI components)
│   ├── convex/            # Convex database schemas and functions
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility libraries
│       ├── ai/            # AI integration code
│       └── rag/           # RAG system implementation
├── prisma/                # Database schema
├── public/                # Static assets
└── local_models/          # Local embedding models
```

## Retrieval-Augmented Generation (RAG)

Trojan Square uses a RAG system to provide accurate USC-specific information:

1. USC website content is processed and stored as vectors in a PostgreSQL database with pgvector.
2. When a user asks a question, the system:
   - Generates an embedding for the query
   - Searches for similar content in the vector database
   - Retrieves relevant USC information
   - Passes this context to the LLM to generate an informed response

## Contributing

We welcome contributions to Trojan Square! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


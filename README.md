# AristotleAI - Digital Lyceum

## Project Overview

AristotleAI is an innovative educational platform that brings classical philosophy education into the digital age through an intelligent tutoring system. This full-stack application combines modern web technologies with time-tested pedagogical methods to create an immersive learning experience centered on Aristotle's philosophical works, particularly his foundational text "Categories."

At its core, AristotleAI implements the classical Trivium method of education—Grammar, Logic, and Rhetoric—through an AI-powered Socratic dialogue system. Unlike traditional educational software that relies on passive content consumption, this platform actively engages students through one-on-one philosophical conversations that mirror the teaching style of ancient Greek philosophers.

The application serves as a "Digital Lyceum," referencing Aristotle's famous school in Athens where he taught students through walking discussions and philosophical inquiry. The AI tutor assumes the persona of an experienced classical education instructor with over 25 years of expertise, guiding students through a carefully structured learning journey that emphasizes mastery-based progression rather than mere completion of material.

**Technical Architecture:**
The platform is built as a modern full-stack TypeScript application featuring a React frontend powered by Vite for optimal development experience and a robust Express.js backend. The frontend utilizes cutting-edge UI components from Radix UI and shadcn/ui, styled with Tailwind CSS for a polished, accessible interface. The backend integrates with OpenAI's GPT-4 through LangChain, enabling sophisticated natural language processing and intelligent conversation management.

**Educational Methodology:**
The tutoring system implements a rigorous three-stage progression model. In the Grammar stage, students must demonstrate mastery of fundamental concepts, definitions, and classifications from Aristotle's Categories. Only after proving solid foundational knowledge can they advance to the Logic stage, where they engage in drawing distinctions, identifying contradictions, and building arguments within Aristotle's philosophical framework. Finally, the Rhetoric stage challenges students to articulate persuasive interpretations and apply Aristotelian concepts to modern contexts.

**Key Features:**
- **Intelligent Conversation Management:** The system maintains context across multiple exchanges, building upon previous discussions to create coherent learning sessions
- **Mastery-Based Progression:** Students cannot advance to higher levels without demonstrating genuine understanding, enforced by the AI tutor's assessment capabilities
- **Topic Flexibility:** Students can explore various aspects of Aristotelian philosophy, including the Ten Categories, Substance theory, Quality vs. Quantity distinctions, Relations, and the crucial concepts of homonymous, synonymous, and paronymous terms
- **Real-time Progress Tracking:** Visual progress indicators help students understand their learning journey while maintaining engagement
- **Socratic Method Implementation:** The AI asks focused, thought-provoking questions that lead students to discover insights rather than simply providing answers

**Educational Impact:**
This platform addresses a critical gap in modern education where classical philosophical training is often inaccessible or diluted. By making Aristotelian philosophy approachable through interactive technology, AristotleAI democratizes access to rigorous philosophical education. The system's emphasis on deep understanding over superficial knowledge acquisition aligns with classical educational values while leveraging modern AI capabilities.

The application particularly excels in developing critical thinking skills, logical reasoning abilities, and precise philosophical vocabulary—competencies that translate far beyond philosophy into fields like law, medicine, theology, and academic research. Students engage with primary source material through guided discovery, ensuring authentic philosophical education rather than simplified summaries.

**Innovation in Educational Technology:**
AristotleAI represents a significant advancement in AI-powered education by successfully combining subject matter expertise with pedagogical sophistication. Unlike generic chatbots or simple Q&A systems, this platform embodies a specific educational philosophy and maintains consistent academic standards throughout the learning experience.

The integration of classical educational methods with modern technology creates a unique learning environment that respects the depth and complexity of philosophical study while making it accessible to contemporary learners. This approach could serve as a model for AI-powered education in other classical subjects, from rhetoric and logic to mathematics and natural philosophy.

## Local Setup Guide

Follow these steps to run AristotleAI on your local machine:

### Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** package manager
- **OpenAI API key** (required for AI functionality)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd AristotleAI
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Set Up Environment Variables

1. Create a `.env` file in the `server` directory:
```bash
mkdir -p server
touch server/.env
```

2. Add your OpenAI API key to `server/.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

**To get an OpenAI API key:**
- Visit [OpenAI's platform](https://platform.openai.com/)
- Sign up or log in to your account
- Navigate to API Keys section
- Create a new API key
- Copy the key and paste it in your `.env` file

⚠️ **Important:** Never commit your `.env` file to version control. The `.env` file should contain your actual API key without quotes.

### Step 4: Start the Development Environment

Run the full-stack application:
```bash
pnpm run dev
```

This command starts both:
- **Frontend**: React app on `http://localhost:3000`
- **Backend**: Express API server on `http://localhost:4000`

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the AristotleAI Digital Lyceum interface with a chat interface ready for philosophical discussions.

### Additional Commands

**Run only the backend server:**
```bash
pnpm run server
```

**Build the application for production:**
```bash
pnpm run build
```

**Run linting:**
```bash
pnpm run lint
```

**Preview production build:**
```bash
pnpm run preview
```

### Troubleshooting

**Common Issues:**

1. **"Cannot find module" errors**: Ensure all dependencies are installed with `pnpm install`

2. **API key not working**:
   - Verify your `.env` file is in the `server` directory
   - Check that your OpenAI API key is valid and has available credits
   - Ensure there are no extra spaces or quotes around the API key

3. **Port conflicts**:
   - Frontend runs on port 3000, backend on port 4000
   - If these ports are in use, stop other applications or modify the port configuration

4. **TypeScript errors**: The project uses TypeScript for both frontend and backend. Ensure your editor supports TypeScript or run `pnpm run build` to check for compilation errors.

### Development Notes

- The frontend uses Vite for hot module replacement, so changes appear instantly
- The backend automatically restarts when you modify server files
- API requests from frontend are proxied to the backend during development
- The chat interface connects to OpenAI's GPT-4 model through the backend API

You're now ready to engage with Aristotelian philosophy through AI-powered Socratic dialogue!
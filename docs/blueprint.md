# **App Name**: CampusConnect Chat

## Core Features:

- Real-time Chat Interface: Display a fullscreen, centered chat window with a header, message bubbles, and an input area for composing and sending messages.
- Dynamic Message Handling: Append user messages to the chat interface as they are sent, and display bot replies in a distinct format upon receiving them from the backend.
- File Upload: Allow users to upload PDF files which will be sent to the server, alongside any user-entered text.
- Backend Communication: Send POST requests to the specified backend API (`http://localhost:5678/webhook/chatbot`) with the user's query and optional PDF file.
- Intelligent Response Refinement Tool: Utilize a generative AI model as a tool to ensure bot responses are contextually relevant and helpful based on the provided text and optional PDF content.

## Style Guidelines:

- Primary color: Blue (#4285F4), a bright and trustworthy color often associated with knowledge and learning.
- Background color: Very light blue (#F0F4FF), providing a subtle contrast that doesn't distract from the chat content.
- Accent color: Violet (#8F00FF) used sparingly for highlights and interactive elements to add a touch of uniqueness and signal interactivity.
- Body and headline font: 'PT Sans', a clear and modern sans-serif suitable for both headings and body text, ensuring readability and a clean aesthetic.
- Use simple, outlined icons for UI elements such as file upload and send button.
- Employ a centered, fullscreen layout with a rounded white card and subtle shadow to focus user attention and provide a clean, modern appearance.
- Incorporate smooth scrolling and subtle transitions for a fluid user experience.
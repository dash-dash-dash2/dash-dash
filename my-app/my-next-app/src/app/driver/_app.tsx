import { AuthProvider } from "../../context/AuthContext.js";
import { ChatProvider } from "../../context/ChatContext.js";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChatProvider> {/* Wrap with ChatProvider */}
            {children}
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

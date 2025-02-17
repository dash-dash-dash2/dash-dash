import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider
import { ChatProvider } from "@/context/ChatContext"; // Import ChatProvider

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

import { createContext } from "react";

interface ChatContextType {}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

function Provider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default {
  Provider,
};

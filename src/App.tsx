import { GlobalStyle } from "./global-style/global-style";
import { NotesApp } from "./pages/main";

export const App: React.FC = () => {
  return (
    <>
      <NotesApp />
      <GlobalStyle />      
    </>
  );
}


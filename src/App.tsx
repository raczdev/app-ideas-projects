import { GlobalStyle } from "./global-style/global-style";
import { MainPage } from "./pages/main-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotesApp } from "./pages/projects/notes-app";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="notes-app" element={<NotesApp />}/>
        <Route />
        <Route />
        <Route />
      </Routes>
      <GlobalStyle />      
    </BrowserRouter>
  );
}


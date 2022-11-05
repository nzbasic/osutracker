import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/navigation/Footer";
import { Header } from "./components/navigation/Header";
import { All } from "./components/pages/All";
import { Compare } from "./components/pages/Compare";
import { Country } from "./components/pages/Country";
import { Historic } from "./components/pages/Historic";
import { Home } from "./components/pages/Home";
import { Redirect } from "./components/pages/Redirect";
import { Stats } from "./components/pages/Stats";
import { User } from "./components/pages/User";
import ThemeProvider from "./ThemeProvider";

export const App = () => {
  
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col items-center bg-gray-200 dark:bg-dark00">
          <Header />
          <div className="bg-blue-400 dark:bg-blue-500 h-72 w-full test"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/country/:name" element={<Country />} />
            <Route path="/historic" element={<Historic />} />
            <Route path="/all" element={<All />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/redirect/:name" element={<Redirect />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/compare/:type" element={<Compare />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

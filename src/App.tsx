
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import CampusSelection from "./pages/CampusSelection";
import Authentication from "./pages/Authentication";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AlumniPortal from "./pages/AlumniPortal";
import PastPapers from "./pages/PastPapers";
import Societies from "./pages/Societies";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/campus-selection" element={<CampusSelection />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/alumni" element={<AlumniPortal />} />
            <Route path="/papers" element={<PastPapers />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

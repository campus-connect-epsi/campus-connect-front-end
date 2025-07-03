
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Equipment from "./pages/Equipment";
import Events from "./pages/Events";
import Forum from "./pages/Forum";
import Projects from "./pages/Projects";
import Reservations from "./pages/Reservations";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import Documents from "./pages/Documents";
import Discussions from "./pages/Discussions";
import EquipmentDetail from "./pages/EquipmentDetail";
import ReserveEquipment from "./pages/ReserveEquipment";
import NewDiscussion from "./pages/NewDiscussion";
import NewEvent from "./pages/NewEvent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/events" element={<Events />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/discussions/new" element={<NewDiscussion />} />
          <Route path="/events/new" element={<NewEvent />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/equipment/:id/reserve" element={<ReserveEquipment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

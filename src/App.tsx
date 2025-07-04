
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Activities from "./pages/Activities";
import Warehouses from "./pages/Warehouses";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import IndustryNews from "./pages/IndustryNews";
import References from "./pages/References";
import Careers from "./pages/Careers";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Quote from "./pages/Quote";
import QuoteSuccess from "./pages/QuoteSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/activites" element={<Activities />} />
          <Route path="/entrepots" element={<Warehouses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* Quote routes */}
          <Route path="/devis" element={<Quote />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/devis/succes" element={<QuoteSuccess />} />
          <Route path="/quote/success" element={<QuoteSuccess />} />
          {/* Change: Actualités now shows IndustryNews instead of Blog */}
          <Route path="/actualites" element={<IndustryNews />} />
          <Route path="/actualites/:slug" element={<BlogPostPage />} />
          <Route path="/actualites-secteur" element={<IndustryNews />} />
          <Route path="/industry-news" element={<IndustryNews />} />
          {/* New pages */}
          <Route path="/references" element={<References />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/carrieres" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

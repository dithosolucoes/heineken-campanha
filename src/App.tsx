
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Auth Pages
import PDVLoginPage from "./pages/auth/PDVLoginPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";

// PDV Pages
import PDVCampaignsPage from "./pages/pdv/PDVCampaignsPage";
import PDVUploadPage from "./pages/pdv/PDVUploadPage";
import PDVHistoryPage from "./pages/pdv/PDVHistoryPage";
import PDVRulesPage from "./pages/pdv/PDVRulesPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUploadsPage from "./pages/admin/AdminUploadsPage";
import AdminRankingPage from "./pages/admin/AdminRankingPage";

// NotFound
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Components
const PDVRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" />;
  // Let PDV users access PDV routes
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || user?.role === 'pdv') return <Navigate to="/admin/login" />;
  // Let admin and superadmin access admin routes
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<PDVLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* PDV Routes */}
            <Route path="/pdv/campaigns" element={<PDVRoute><PDVCampaignsPage /></PDVRoute>} />
            <Route path="/pdv/upload" element={<PDVRoute><Navigate to="/pdv/campaigns" /></PDVRoute>} />
            <Route path="/pdv/upload/:campaignId" element={<PDVRoute><PDVUploadPage /></PDVRoute>} />
            <Route path="/pdv/history" element={<PDVRoute><PDVHistoryPage /></PDVRoute>} />
            <Route path="/pdv/rules" element={<PDVRoute><PDVRulesPage /></PDVRoute>} />
            <Route path="/pdv/rules/:campaignId" element={<PDVRoute><PDVRulesPage /></PDVRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/uploads" element={<AdminRoute><AdminUploadsPage /></AdminRoute>} />
            <Route path="/admin/ranking" element={<AdminRoute><AdminRankingPage /></AdminRoute>} />
            <Route path="/admin/campaigns" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/pdvs" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/reports" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            
            {/* Redirect root to appropriate page based on authentication */}
            <Route 
              path="/admin" 
              element={<Navigate to="/admin/dashboard" />} 
            />
            <Route 
              path="/pdv" 
              element={<Navigate to="/pdv/campaigns" />} 
            />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

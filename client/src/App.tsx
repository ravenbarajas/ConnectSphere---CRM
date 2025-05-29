import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import LandingPage from "@/pages/LandingPage";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/" component={isLoggedIn ? Dashboard : LandingPage} />
      <Route path="/dashboard/:section?">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <AppRoutes />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

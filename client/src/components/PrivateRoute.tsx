import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null; // Could redirect to login page
  }

  return <>{children}</>;
}

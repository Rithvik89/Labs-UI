import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthScreen from './screens/AuthScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChallengeDetailScreen from './screens/ChallengeDetailScreen';
import Navigation from './components/Navigation';
import theme from './theme';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box minH="100vh" bg="gray.50">
      {isAuthenticated && <Navigation />}
      <Box as="main" pt={isAuthenticated ? "80px" : "0"}>
        <Routes>
          <Route path="/auth" element={<AuthScreen />} />
          <Route 
            path="/challenges" 
            element={
              <PrivateRoute>
                <ChallengesScreen />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/challenge/:id" 
            element={
              <PrivateRoute>
                <ChallengeDetailScreen />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/challenges" />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

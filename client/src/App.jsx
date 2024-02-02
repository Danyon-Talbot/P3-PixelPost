import './App.css';
import React, { useEffect, useState } from 'react';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache, 
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql', 
});

const AppProvider = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const authLink = setContext((_, { headers }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Retrieved User Token', token);
  
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '', // Include "Bearer" prefix
        },
      };
    } catch (error) {
      console.error('Error retrieving token:', error);
      return {
        headers,
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Outlet />
      </div>
    </ApolloProvider>
  );

}

function App() {
   return (
    <AppProvider />
   );
}

export default App;


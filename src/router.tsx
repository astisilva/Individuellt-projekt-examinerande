import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './pages/Home';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import DogList from './pages/DogList';
import DogDetails from './pages/DogDetails';
import DogForm from './pages/DogForm';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ArrivedDogs from './pages/ArrivedDogs';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} />


       {/* Wrappar in varje skyddad route med ProtectedRoute  */}
      <Route
        path="/doglist"
        element={
          <ProtectedRoute>
            <DogList />
     </ProtectedRoute> 
        }
      />
      <Route
        path="/dogdetails/:chipNumber"
        element={
          <ProtectedRoute>
            <DogDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dogform"
        element={
          <ProtectedRoute>
            <DogForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:chipNumber"
        element={
          <ProtectedRoute>
            <DogForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/arriveddogs"
        element={
          <ProtectedRoute>
            <ArrivedDogs />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />

    
    </Route>
  )
);

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import { AlertProvider } from "./context/AlertContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Games from "./pages/games/Games";
import Container from "./components/Layout/Container";
import Reviews from "./pages/reviews/Reviews";
import Review from "./pages/reviews/Review";
import Game from "./pages/games/Game";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import EditProfileForm from "./pages/profile/EditProfileForm";
import EditPasswordForm from "./pages/profile/EditPasswordForm";
import Notifications from "./pages/notifications/Notifications";
import VerifyEmail from "./pages/auth/VerifyEmail";
import EmailVerified from "./pages/auth/EmailVerified";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import PasswordReset from "./pages/auth/PasswordReset";
import Favorites from "./pages/profile/Favorites";
import Comunity from "./pages/comunity/Comunity";
import Followed from "./pages/profile/Followed";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <Container>
            <Routes>
              <Route path="*" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/:id/edit" element={<EditProfileForm />} />
              <Route
                path="/profile/:id/change-password"
                element={<EditPasswordForm />}
              />
              <Route path="/profile/:id/favorites" element={<Favorites />} />
              <Route
                path="/profile/:id/reviews"
                element={<Reviews type="user" />}
              />
              <Route
                path="/profile/:id/followed"
                element={<Followed type={"followed"} />}
              />
              <Route
                path="/profile/:id/followers"
                element={<Followed type={"followers"} />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/verification-notification"
                element={<VerifyEmail />}
              />
              <Route
                path="send-password-reset"
                element={<SendPasswordResetEmail />}
              />
              <Route
                path="/password-reset/:token"
                element={<PasswordReset />}
              />
              <Route path="/verify-email" element={<EmailVerified />} />
              <Route path="/games" element={<Games />} />
              <Route
                path="/game/:id"
                element={
                  <GameProvider>
                    <Game />
                  </GameProvider>
                }
              />
              <Route
                path="/game/:id/reviews"
                element={<Reviews type="game" />}
              />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/comunity" element={<Comunity />} />
            </Routes>
          </Container>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

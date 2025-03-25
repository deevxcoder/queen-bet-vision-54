
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-queen-dark">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8 inline-block">
            <div className="text-8xl font-bold text-white opacity-10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-queen-gold">404</div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          
          <p className="text-queen-text-secondary mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center justify-center w-full sm:w-auto bg-queen-gold text-queen-dark px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-queen-gold/20"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium border border-white/10 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

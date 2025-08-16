import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { supabase } from "../supabaseClient";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Esta función habla con la tabla segura auth.users de Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Considera mostrar el error al usuario en lugar de solo en la consola
      console.error('Error en el login:', error.message);
      alert(error.message); // Ejemplo simple de feedback al usuario
    } else {
      console.log('Login exitoso:', data);
      // La redirección está perfecta
      navigate('/dashboard');
    }
  };

  // Si el usuario quiere registrarse, mostrar el componente SignUp
  if (showSignUp) {
    return <SignUp onBackToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl border border-yellow-200 overflow-hidden">
          
          {/* Header con gradiente */}
          <div className="bg-white px-6 py-8 text-center relative">
            <div className="absolute inset-0  bg-opacity-5"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-4xl">🐔</span>
              </div>
              <h1 className="text-2xl font-bold text-yellow-900 mb-2">
                Sistema Avícola
              </h1>
              <p className="text-yellow-800 opacity-90 font-medium">
                Accede a tu panel de control
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-6 py-6">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-yellow-900 py-4 px-6 rounded-xl text-base font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Iniciar Sesión</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  ¿Nuevo usuario?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center">
              <button 
                type="button"
                onClick={() => setShowSignUp(true)}
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-200 group"
              >
                <span>Crear cuenta nueva</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default Login;
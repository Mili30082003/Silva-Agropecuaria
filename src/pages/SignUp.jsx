import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onBackToLogin }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('empleado'); // admin o empleado
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // 1️⃣ Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // 2️⃣ Guardar usuario en tu tabla "usuarios" con rol y nombre
    const { data: dbData, error: dbError } = await supabase
      .from('usuarios')
      .insert([
        {
          id: authData.user.id, // usar mismo id de Auth
          nombre,
          email,
          rol,
        },
      ]);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    alert('Registro exitoso! Ya puedes hacer login.');
    navigate('/login'); // redirige al login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Card Container */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-yellow-200 overflow-hidden">
          
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 text-center relative">
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <span className="text-2xl sm:text-3xl lg:text-4xl">🐔</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-900 mb-1 sm:mb-2">
                Crear Cuenta
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-yellow-800 opacity-90 font-medium">
                Únete al Sistema Avícola
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs sm:text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-6">
                
              {/* Nombre Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Rol Select */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                  Tipo de Usuario
                </label>
                <div className="relative">
                  <select 
                    value={rol} 
                    onChange={(e) => setRol(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400 focus:bg-white focus:ring-4 focus:ring-yellow-100 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="empleado">👤 Empleado</option>
                    <option value="admin">👨‍💼 Administrador</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* SignUp Button */}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-yellow-900 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <span>Crear Cuenta</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500 font-medium">
                  ¿Ya tienes cuenta?
                </span>
              </div>
            </div>

            {/* Back to Login Link */}
            <div className="text-center">
              <button 
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center space-x-1 sm:space-x-2 text-yellow-600 hover:text-yellow-700 text-sm sm:text-base font-semibold transition-colors duration-200 group"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
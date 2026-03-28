"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || "Error al enviar el correo");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/auth/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al login
          </Link>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-[#C41E3A]/10 rounded-full">
              <Shield className="w-12 h-12 text-[#C41E3A]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
            Recuperar Contraseña
          </h1>
          <p className="text-gray-400">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          {sent ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Correo Enviado</h2>
              <p className="text-gray-400 mb-6">
                Hemos enviado un enlace de recuperación a <strong className="text-white">{email}</strong>
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Revisa tu bandeja de entrada y spam. El enlace expira en 1 hora.
              </p>
              <Link 
                href="/auth/login"
                className="inline-flex items-center gap-2 text-[#C41E3A] hover:text-[#A01830] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="oficial@7ciabomberos.cl"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-[#0F0F0F] border border-[#3A3A3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C41E3A] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#C41E3A] hover:bg-[#A01830] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Enlace de Recuperación"
                )}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/register" className="text-[#C41E3A] hover:underline">
              Solicitar acceso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

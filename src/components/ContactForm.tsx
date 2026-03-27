"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  telefono: z.string().min(8, "Ingresa un número de teléfono válido"),
  asunto: z.string().min(1, "Selecciona un asunto"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form data:", data)
    setIsSubmitted(true)
    reset()
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-verde-exito mx-auto mb-4" />
        <h2 className="font-heading text-3xl font-bold text-rojo-oscuro mb-4">
          Mensaje Enviado
        </h2>
        <p className="text-gris-medio mb-8">
          Gracias por contactarnos. Tu mensaje ha sido recibido y será respondido a la brevedad.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-rojo-bombero font-semibold hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gris-carbon mb-1">
          Nombre completo *
        </label>
        <input
          {...register("nombre")}
          id="nombre"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rojo-bombero focus:border-transparent outline-none"
          placeholder="Tu nombre"
          aria-invalid={errors.nombre ? "true" : "false"}
        />
        {errors.nombre && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.nombre.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gris-carbon mb-1">
            Email *
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rojo-bombero focus:border-transparent outline-none"
            placeholder="tu@email.cl"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gris-carbon mb-1">
            Teléfono *
          </label>
          <input
            {...register("telefono")}
            id="telefono"
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rojo-bombero focus:border-transparent outline-none"
            placeholder="+56 9 XXXX XXXX"
            aria-invalid={errors.telefono ? "true" : "false"}
          />
          {errors.telefono && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.telefono.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gris-carbon mb-1">
          Asunto *
        </label>
        <select
          {...register("asunto")}
          id="asunto"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rojo-bombero focus:border-transparent outline-none"
          aria-invalid={errors.asunto ? "true" : "false"}
        >
          <option value="">Selecciona un asunto</option>
          <option value="voluntario">Quiero ser voluntario</option>
          <option value="informacion">Información general</option>
          <option value="donacion">Donaciones</option>
          <option value="otro">Otro</option>
        </select>
        {errors.asunto && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.asunto.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gris-carbon mb-1">
          Mensaje *
        </label>
        <textarea
          {...register("mensaje")}
          id="mensaje"
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rojo-bombero focus:border-transparent outline-none resize-none"
          placeholder="Escribe tu mensaje..."
          aria-invalid={errors.mensaje ? "true" : "false"}
        />
        {errors.mensaje && (
          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.mensaje.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rojo-bombero text-white px-6 py-3 font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            <Send className="w-5 h-5" /> Enviar Mensaje
          </>
        )}
      </button>
    </form>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Play, Pause, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroProps {
  videoSrc?: string
  onVideoReady?: (ready: boolean) => void
}

export function Hero({ videoSrc, onVideoReady }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (videoSrc) {
      const video = document.getElementById("hero-video") as HTMLVideoElement
      if (video) {
        video.play().catch(() => setVideoError(true))
      }
    }
  }, [videoSrc])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    onVideoReady?.(true)
  }

  const toggleVideo = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {videoSrc && !videoError ? (
        <>
          <video
            id="hero-video"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            onError={() => setVideoError(true)}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <button
            onClick={toggleVideo}
            className="absolute bottom-24 right-4 md:bottom-32 md:right-8 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-rojo-oscuro via-rojo-bombero to-rojo-oscuro" />
      )}

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-block w-20 h-20 md:w-24 md:h-24 bg-rojo-bombero rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white/20">
              <span className="font-heading text-4xl md:text-5xl font-bold text-white">7</span>
            </div>
            <p className="font-heading text-amarillo-seguridad font-semibold tracking-widest text-sm md:text-base mb-2">
              CUERPO DE BOMBEROS DE VIÑA DEL MAR
            </p>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Séptima Compañía
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-gray-200 mb-2">
            Bomberos Viña del Mar Alto
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            Especialidad: <span className="font-semibold text-amarillo-seguridad">Estructural y Forestal</span>
          </p>

          <p className="font-heading text-2xl md:text-3xl italic text-gray-200 mb-8">
            Abnegación, Servicio y Disciplina
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-amarillo-seguridad text-gris-carbon px-6 py-3 md:px-8 md:py-4 font-bold rounded-md hover:bg-yellow-400 transition-colors shadow-lg"
            >
              Únete a la Guardia <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/rescate-desnivel"
              className="inline-flex items-center gap-2 border-2 border-white px-6 py-3 md:px-8 md:py-4 font-bold rounded-md hover:bg-white hover:text-rojo-oscuro transition-colors"
            >
              Nuestra Especialidad
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 font-bold rounded-md shadow-lg transition-colors"
              style={{ backgroundColor: '#FFD700', color: '#1A1A1A' }}
            >
              <Lock className="w-5 h-5" />
              Portal Admin
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

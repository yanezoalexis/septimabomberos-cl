"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, X, MapPin, Clock } from "lucide-react";
import { getStatusLabel, eventTypes } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string | null;
  type: string;
  location: string;
  description: string;
}

export default function CalendarioPage() {
  const [events] = useState<CalendarEvent[]>([
    { id: "1", title: "Capacitación Rescate en Altura", date: "2024-03-28", startTime: "18:00", endTime: "21:00", type: "CAPACITACION", location: "Cuartel 7ma Cía", description: "Práctica de rescate en desnivel" },
    { id: "2", title: "Reunión Mensual", date: "2024-04-02", startTime: "20:00", endTime: "22:00", type: "REUNION", location: "Salón Protocolar", description: "Asistencia obligatoria" },
    { id: "3", title: "Ejercicio de Mangueras", date: "2024-04-06", startTime: "09:00", endTime: "12:00", type: "PRACTICA", location: "Estacionamiento Principal", description: "Manipulación de mangueras de alta presión" },
    { id: "4", title: "Día del Bombero", date: "2024-04-30", startTime: "10:00", endTime: "14:00", type: "OTRO", location: "Plaza Vergara", description: "Actividad ceremonial" },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  function getEventsForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  }

  function handleDayClick(day: number) {
    setSelectedDate(new Date(year, month, day));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>
            Calendario de Actividades
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Eventos, capacitaciones y reuniones
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#C41E3A] hover:bg-[#A01830] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goToday} className="px-3 py-1 text-sm text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors">
                Hoy
              </button>
              <button onClick={nextMonth} className="p-2 text-gray-400 hover:text-white hover:bg-[#2A2A2A] rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-gray-500 text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month;

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square p-1 rounded-md transition-colors relative ${
                    isSelected
                      ? "bg-[#C41E3A] text-white"
                      : "hover:bg-[#2A2A2A] text-gray-300"
                  }`}
                >
                  <span className="text-sm">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((e, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            e.type === "EMERGENCIA" ? "bg-red-400" :
                            e.type === "CAPACITACION" ? "bg-green-400" :
                            e.type === "REUNION" ? "bg-blue-400" :
                            "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#2A2A2A]">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              Reunión
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              Capacitación
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              Práctica
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              Otro
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">
            {selectedDate
              ? `${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`
              : "Selecciona un día"}
          </h3>
          <div className="space-y-3">
            {selectedDate && getEventsForDay(selectedDate.getDate()).length > 0 ? (
              getEventsForDay(selectedDate.getDate()).map((event) => (
                <div key={event.id} className="p-3 bg-[#0F0F0F] rounded-md border-l-4" style={{
                  borderColor: event.type === "CAPACITACION" ? "#22c55e" : event.type === "REUNION" ? "#3b82f6" : "#f97316"
                }}>
                  <h4 className="text-white font-medium text-sm">{event.title}</h4>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                    <Clock className="w-3 h-3" />
                    {event.startTime} {event.endTime && `- ${event.endTime}`}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                {selectedDate ? "No hay eventos para este día" : "Selecciona un día para ver eventos"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Próximos Eventos</h3>
        <div className="space-y-3">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 bg-[#0F0F0F] rounded-md">
              <div className={`w-12 h-12 rounded-md flex flex-col items-center justify-center ${
                event.type === "CAPACITACION" ? "bg-green-500/20" :
                event.type === "REUNION" ? "bg-blue-500/20" :
                event.type === "PRACTICA" ? "bg-orange-500/20" :
                "bg-gray-500/20"
              }`}>
                <span className="text-white text-sm font-bold">{new Date(event.date).getDate()}</span>
                <span className="text-white text-[10px]">{monthNames[new Date(event.date).getMonth()].slice(0, 3)}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium">{event.title}</h4>
                <p className="text-gray-500 text-xs flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3" />
                  {event.startTime}
                  {event.location && (
                    <>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">Nuevo Evento</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Título *</label>
                <input type="text" name="title" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fecha *</label>
                <input type="date" name="date" required className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Inicio</label>
                  <input type="time" name="startTime" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Hora Fin</label>
                  <input type="time" name="endTime" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
                <select name="type" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]">
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Ubicación</label>
                <input type="text" name="location" className="w-full px-3 py-2 bg-[#0F0F0F] border border-[#3A3A3A] rounded-md text-white focus:outline-none focus:border-[#C41E3A]" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#C41E3A] hover:bg-[#A01830] text-white rounded-md">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

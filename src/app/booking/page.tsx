"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import { generateDynamicSlots, DaySlots, BookingSlot } from "@/utils/mockData";

export default function BookingPage() {
  const [scheduleData, setScheduleData] = useState<DaySlots[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Booking status
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate mock dates/slots starting tomorrow
    setScheduleData(generateDynamicSlots());
  }, []);

  const handleSelectDay = (idx: number) => {
    setSelectedDayIndex(idx);
    setSelectedSlot(null); // Reset selected slot when changing dates
  };

  const handleSelectSlot = (slot: BookingSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) tempErrors.phone = "Phone number is required";
    if (!hotelName.trim()) tempErrors.hotelName = "Hotel / Property name is required";
    if (!selectedSlot) tempErrors.slot = "Please select an available time slot";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: replace mock slots with real Calendar API fetch
      setBookingConfirmed(true);
    }
  };

  const copyMeetLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/exi-leau-tom");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeDay = scheduleData[selectedDayIndex];

  return (
    <div className="relative w-full overflow-hidden bg-primary py-12 sm:py-20 flex-1 flex flex-col justify-center animate-in fade-in duration-300">
      <div className="mx-auto max-w-6xl w-full px-6 sm:px-8">
        
        {/* Page Header (White text on green background) */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-3">
          <div className="inline-flex self-center items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white">
            <Sparkles className="h-3.5 w-3.5" />
            Operational Consultation Call
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white font-heading">
            Schedule a Scoping Call
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-sans">
            Pick a date and time slot to discuss custom bot developments, workflow mapping, and check details for scheduling an automation audit.
          </p>
        </div>

        {/* Booking Card Box (White panel floating on green background) */}
        <div className="bg-white border border-card-border rounded-3xl p-6 sm:p-10 shadow-xl text-foreground">
          <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Col: Slot Picker (Date & Times) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Date Scroll Grid */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  1. Select a Date
                </span>
                
                {/* Horizontal Scrollable Day Cards */}
                <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-card-border">
                  {scheduleData.map((day, idx) => {
                    const isSelected = idx === selectedDayIndex;
                    const parts = day.formattedDate.split(", ");
                    const dayName = parts[0].slice(0, 3);
                    const monthDay = parts[1];

                    return (
                      <button
                        key={day.dateString}
                        type="button"
                        onClick={() => handleSelectDay(idx)}
                        className={`flex flex-col items-center justify-center min-w-[76px] h-20 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                            : "border-card-border bg-white text-foreground hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase opacity-80">{dayName}</span>
                        <span className="text-lg font-black tracking-tight font-heading">{monthDay.split(" ")[1]}</span>
                        <span className="text-[9px] font-medium uppercase opacity-75">{monthDay.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" />
                  2. Select an Available Time Slot
                </span>

                {activeDay ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {activeDay.slots.map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => handleSelectSlot(slot)}
                          className={`flex items-center justify-center h-12 rounded-xl border text-sm font-semibold transition-all relative ${
                            !slot.available
                              ? "border-card-border/60 bg-slate-100 text-muted/40 line-through cursor-not-allowed"
                              : isSelected
                              ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                              : "border-card-border bg-white text-foreground hover:border-primary/40 hover:bg-primary/[0.02]"
                          }`}
                        >
                          {slot.time}
                          {!slot.available && (
                            <span className="absolute bottom-1 right-2 text-[7px] uppercase font-bold tracking-widest text-muted/40 font-heading">
                              Booked
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center text-sm text-muted font-sans">
                    Loading slots...
                  </div>
                )}
                {errors.slot && (
                  <span className="text-xs font-semibold text-red-500">{errors.slot}</span>
                )}
              </div>

              {/* Notice Box */}
              <div className="flex gap-3 rounded-2xl border border-card-border bg-slate-50 p-4 mt-2">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted leading-relaxed font-sans">
                  Scoping calls are conducted via Google Meet and take approximately 30 minutes. We will outline how your workflow channels connect and what data is compiled.
                </p>
              </div>

            </div>

            {/* Right Col: Details Form */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-card-border pt-8 lg:pt-0 lg:pl-10 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5 pb-2 border-b border-card-border/60">
                <User className="h-4 w-4 text-primary" />
                3. Your Operational Details
              </span>

              <div className="flex flex-col gap-4">
                <FormInput
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  required
                />
                
                <FormInput
                  label="Work Email"
                  id="email"
                  type="email"
                  placeholder="sjenkins@grandriviera.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  placeholder="+91 90748 40614"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  required
                />

                <FormInput
                  label="Hotel / Property Name"
                  id="hotelName"
                  type="text"
                  placeholder="The Grand Riviera Resort"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  error={errors.hotelName}
                  required
                />
              </div>

              {/* Selected date display */}
              {selectedSlot && activeDay && (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col gap-1.5 animate-in fade-in slide-in-from-right-1 duration-200">
                  <span className="text-[10px] font-bold uppercase text-primary tracking-widest font-heading">
                    Selected Appointment
                  </span>
                  <div className="text-sm font-bold text-foreground flex items-center gap-2 font-sans">
                    <Calendar className="h-4 w-4 text-primary" />
                    {activeDay.formattedDate}
                  </div>
                  <div className="text-xs font-bold text-muted flex items-center gap-2 font-sans">
                    <Clock className="h-4 w-4 text-primary" />
                    {selectedSlot.time} (30 min call)
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-4 font-heading"
              >
                Confirm Appointment
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Success Modal */}
      {bookingConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl bg-white border border-card-border p-8 flex flex-col items-center text-center gap-6 relative animate-in zoom-in-95 duration-200 shadow-xl">
            
            {/* Checkmark icon */}
            <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-foreground font-heading">Appointment Scheduled!</h2>
              <p className="text-xs text-muted leading-relaxed px-4 font-sans">
                Thank you, {name}. Your consultation is successfully scheduled. We have sent a calendar invite to <strong className="text-foreground">{email}</strong>.
              </p>
            </div>

            {/* Summary details */}
            <div className="w-full rounded-2xl border border-card-border bg-slate-50 p-4 flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted uppercase font-heading">Hotel:</span>
                <span className="font-bold text-foreground flex items-center gap-1.5 font-sans">
                  <Building className="h-3.5 w-3.5 text-primary" />
                  {hotelName}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted uppercase font-heading">Date:</span>
                <span className="font-bold text-foreground">
                  {activeDay?.formattedDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-muted uppercase font-heading">Time Slot:</span>
                <span className="font-bold text-foreground">
                  {selectedSlot?.time}
                </span>
              </div>
              <div className="border-t border-card-border pt-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider font-heading">
                  Video Call Invitation Link
                </span>
                
                {/* Meeting copy-paste bar */}
                <div className="flex gap-2 w-full">
                  <div className="flex-1 flex h-10 items-center gap-2 rounded-full border border-card-border bg-white px-3 text-xs text-primary font-bold overflow-hidden select-all font-sans">
                    <Video className="h-4 w-4 text-primary shrink-0" />
                    meet.google.com/exi-leau-tom
                  </div>
                  <button
                    onClick={copyMeetLink}
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-slate-50 hover:bg-card-border/50 text-foreground transition-colors shrink-0 cursor-pointer"
                    title="Copy Meeting URL"
                  >
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 mt-2">
              <Link
                href="/"
                className="flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/15 hover:bg-primary-hover transition-colors font-heading"
              >
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => {
                  setBookingConfirmed(false);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setHotelName("");
                  setSelectedSlot(null);
                }}
                className="text-xs font-semibold text-muted hover:text-foreground transition-colors cursor-pointer font-sans"
              >
                Schedule Another Call
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

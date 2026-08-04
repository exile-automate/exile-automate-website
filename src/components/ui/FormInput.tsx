import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextArea?: boolean;
  rows?: number;
  error?: string;
}

export default function FormInput({
  label,
  isTextArea = false,
  rows = 4,
  error,
  className = "",
  id,
  ...props
}: FormInputProps) {
  const inputClass = `w-full rounded-xl border border-card-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 ${
    error ? "border-red-500/50 focus:ring-red-500/10" : ""
  } ${className}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-muted/90">
        {label}
      </label>
      
      {isTextArea ? (
        <textarea
          id={id}
          rows={rows}
          className={inputClass}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={inputClass}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {error && (
        <span className="text-xs font-semibold text-red-500 animate-in fade-in slide-in-from-top-1 duration-150">
          {error}
        </span>
      )}
    </div>
  );
}

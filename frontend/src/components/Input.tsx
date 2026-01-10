import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-archival-muted">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={twMerge(
                        "w-full bg-archival-paper border-b-2 border-archival-border px-0 py-2",
                        "font-sans text-archival-ink placeholder:text-archival-muted/50",
                        "focus:outline-none focus:border-archival-accent transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error && "border-archival-red focus:border-archival-red",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-archival-red font-mono">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
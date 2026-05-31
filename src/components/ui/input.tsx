import { type InputHTMLAttributes, forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className = '', 'aria-invalid': ariaInvalid, ...props }, ref) => (
        <input
            ref={ref}
            aria-invalid={ariaInvalid}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white outline-none transition-colors text-slate-700

        disabled:opacity-50 disabled:cursor-not-allowed
        ${
            ariaInvalid
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
        } ${className}`}
            {...props}
        />
    )
);
Input.displayName = 'Input';

export default Input;

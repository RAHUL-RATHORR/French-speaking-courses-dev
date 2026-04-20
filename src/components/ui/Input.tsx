import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  className?: string;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  className?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-french-red ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue ${
          error ? 'border-french-red' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-french-red">{error}</p>}
    </div>
  );
}

export function TextArea({ label, error, className = '', ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-french-red ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue ${
          error ? 'border-french-red' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-french-red">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-french-red ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-french-blue focus:border-french-blue ${
          error ? 'border-french-red' : ''
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-french-red">{error}</p>}
    </div>
  );
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start ${className}`}>
      <input
        type="checkbox"
        className="mt-1 mr-3 w-4 h-4 text-french-blue border-gray-300 rounded focus:ring-french-blue"
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

const COMMON_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'protonmail.com',
  'aol.com',
  'mail.com',
  'yandex.com',
  'gmx.com',
];

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function EmailInput({
  value,
  onChange,
  placeholder = "youremail@gmail.com",
  className = "",
  disabled = false,
  required = false,
}: EmailInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    // Check if user is typing after @ symbol
    const atIndex = inputValue.lastIndexOf('@');
    
    if (atIndex !== -1) {
      // User has typed @, show domain suggestions
      const domainPart = inputValue.substring(atIndex + 1);
      const localPart = inputValue.substring(0, atIndex);

      if (domainPart.length > 0 && !domainPart.includes(' ')) {
        // Filter domains that match what user is typing
        const filtered = COMMON_EMAIL_DOMAINS.filter(domain =>
          domain.toLowerCase().startsWith(domainPart.toLowerCase())
        );

        if (filtered.length > 0) {
          setSuggestions(filtered.map(domain => `${localPart}@${domain}`));
          setShowSuggestions(true);
          setSelectedIndex(-1);
        } else {
          setShowSuggestions(false);
        }
      } else if (domainPart.length === 0) {
        // Show all suggestions when @ is typed
        setSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${localPart}@${domain}`));
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setShowSuggestions(false);
      }
    } else {
      // User hasn't typed @ yet, show suggestions with @ prefix
      // Only show if there's some text and no spaces
      if (inputValue.length > 0 && !inputValue.includes(' ') && !inputValue.includes('@')) {
        // Show suggestions with @ prefix
        setSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${inputValue}@${domain}`));
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Tab' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="email"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          // Show suggestions based on current value
          const atIndex = value.lastIndexOf('@');
          if (atIndex !== -1) {
            // @ is present, show domain suggestions
            const localPart = value.substring(0, atIndex);
            const domainPart = value.substring(atIndex + 1);
            if (!domainPart.includes(' ')) {
              const filtered = COMMON_EMAIL_DOMAINS.filter(domain =>
                domain.toLowerCase().startsWith(domainPart.toLowerCase())
              );
              if (filtered.length > 0) {
                setSuggestions(filtered.map(domain => `${localPart}@${domain}`));
              } else {
                setSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${localPart}@${domain}`));
              }
              setShowSuggestions(true);
            }
          } else if (value.length > 0 && !value.includes(' ')) {
            // No @ yet, show suggestions with @ prefix
            setSuggestions(COMMON_EMAIL_DOMAINS.map(domain => `${value}@${domain}`));
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={className}
        autoComplete="email"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-black border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                index === selectedIndex ? 'bg-white/20' : ''
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


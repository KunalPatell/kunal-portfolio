"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: LucideIcon;
  external?: boolean;
}

export function CyberButton({
  children,
  onClick,
  href,
  className = "",
  icon: Icon,
  external = false,
}: CyberButtonProps) {
  const content = (
    <span className="glyphs gap-2 font-mono uppercase tracking-wider text-xs">
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="text">{children}</span>
    </span>
  );

  const inner = (
    <>
      <span className="outline" />
      <span className="bg" />
      {content}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`cyber-button ${className}`}
        >
          {inner}
        </a>
      );
    }
    return (
      <a href={href} className={`cyber-button ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`cyber-button ${className}`}>
      {inner}
    </button>
  );
}

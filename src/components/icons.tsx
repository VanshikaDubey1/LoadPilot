import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L12 12M12 12L6 12M12 12L18 12M12 12L15 21L12 21L9 21" />
      <path d="M12 2L18 7L12 12" />
      <path d="M12 2L6 7L12 12" />
    </svg>
  );
}

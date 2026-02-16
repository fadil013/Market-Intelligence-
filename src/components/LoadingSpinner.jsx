import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-full w-full min-h-[400px]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 rounded-full" style={{ borderColor: 'rgba(59,130,246,0.2)' }}></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 rounded-full animate-spin" style={{ borderColor: '#3b82f6', borderTopColor: 'transparent' }}></div>
            </div>
        </div>
    );
};

// Add keyframes for spinning if not already globally defined, though typically executed via Tailwind/utility classes.
// Since we are using vanilla CSS utilities now:
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

export default LoadingSpinner;

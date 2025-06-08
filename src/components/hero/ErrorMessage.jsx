import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ 
  message, 
  onRetry, 
  retryText, 
  title, 
  variant = 'danger',
  className = '',
  iconSize = 'lg',
  showIcon = true
}) => {
  // Variant styles
  const variants = {
    danger: {
      bg: 'bg-red-50/80',
      border: 'border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      text: 'text-red-700',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    warning: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      icon: 'text-amber-500',
      title: 'text-amber-800',
      text: 'text-amber-700',
      button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
    },
    info: {
      bg: 'bg-blue-50/80',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    }
  };

  const currentVariant = variants[variant] || variants.danger;

  // Icon sizes
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  return (
    <div 
      className={`max-w-md mx-auto p-6 rounded-xl shadow-lg border backdrop-blur-sm transition-all duration-300 ${currentVariant.bg} ${currentVariant.border} ${className}`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {showIcon && (
          <svg
            className={`${iconSizes[iconSize] || iconSizes.lg} ${currentVariant.icon} mb-2 animate-bounce`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}

        <h3 className={`text-xl font-semibold ${currentVariant.title} mb-1`}>
          {title || 'Something went wrong'}
        </h3>
        
        <p className={`${currentVariant.text} mb-4 leading-relaxed`}>
          {message || 'An unexpected error occurred. Please try again later.'}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className={`px-5 py-2.5 text-white font-medium rounded-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentVariant.button}`}
          >
            <div className="flex items-center space-x-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{retryText || 'Try Again'}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  onRetry: PropTypes.func,
  retryText: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'warning', 'info']),
  className: PropTypes.string,
  iconSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showIcon: PropTypes.bool
};

ErrorMessage.defaultProps = {
  message: '',
  title: '',
  onRetry: null,
  retryText: '',
  variant: 'danger',
  className: '',
  iconSize: 'lg',
  showIcon: true
};

export default ErrorMessage;
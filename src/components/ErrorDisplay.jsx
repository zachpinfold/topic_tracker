import React from 'react';

const ErrorDisplay = ({msg}) => {
    const err = msg || 'Page not found...'
    return (
        <div>
            <h1>{err}</h1>
        </div>
    );
};

export default ErrorDisplay;
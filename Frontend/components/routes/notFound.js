import React from 'react';

export default function NotFound({ location }) {
  return (
    <div>
      <h1>
        Página não encontrada! (
        {location.pathname}
        )
      </h1>
    </div>
  );
}
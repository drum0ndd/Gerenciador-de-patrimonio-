// dialog.jsx
import React from 'react'

const Dialog = ({ title, children, onClose }) => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '20px',
        zIndex: 9999
      }}
    >
      {title && <h2>{title}</h2>}
      <div>
        {children}
      </div>
      <button onClick={onClose} style={{marginTop: '20px'}}>
        Fechar
      </button>
    </div>
  )
}

export default Dialog

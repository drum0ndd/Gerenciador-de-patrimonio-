// Gerenciador-de-patrimonio-/Frontend/components/ui/alert.jsx
import React from 'react'

const Alert = ({ message, type = 'info' }) => {
  const colors = {
    info: '#d1ecf1',
    success: '#d4edda',
    warning: '#fff3cd',
    error: '#f8d7da'
  }
  
  const backgroundColor = colors[type] || colors.info

  return (
    <div style={{
      backgroundColor,
      padding: '10px 15px',
      borderRadius: '4px',
      marginBottom: '10px'
    }}>
      {message}
    </div>
  )
}

export default Alert;

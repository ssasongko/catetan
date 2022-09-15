import React, { useContext } from 'react'
import "../../styles/spinner.css";

import LocaleContext from '../../contexts/LocaleContext';

const LoadingSpinner = () => {
  const { locale } = useContext(LocaleContext)

  return (
    <div className="spinner-container flex flex-col items-center justify-center">
      <div className="loading-spinner">
      </div>
      <span>{(locale === 'id' ? 'Sedang menyiapkan catatanmu' : 'Waiting for notes')}</span>
    </div>
  )
}

export default LoadingSpinner
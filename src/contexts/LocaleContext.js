import React, { createContext, useEffect, useState } from "react"

const getInitialLocale = () => {
  return localStorage.getItem('locale') || 'id'
}

const LocaleContext = createContext()

export const LocaleProvider = ({children}) => {
  const [locale, setLocale] = useState(getInitialLocale)

  const updateLang = () => {
    return localStorage.setItem('locale', locale)
  }

  useEffect(() => {
    updateLang()
  }, [locale]);
  
  return (
    <LocaleContext.Provider value={{ locale, setLocale}}>
      {children}
    </LocaleContext.Provider>
  )
}


export default LocaleContext
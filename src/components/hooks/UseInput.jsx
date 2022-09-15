import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    if(event === undefined){
      setValue('')
      return 
    }
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
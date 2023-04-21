import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_GeneratorUrl } from '../../constants/api';

export function GeneratorOptions(props) {
  const [generators, setGenerators] = useState(null);

  useEffect(() => {
    axios.get(API_GeneratorUrl).then((response) => {
      setGenerators(response.data);
      //console.log(response.data);
    });
  }, []);

  if (!generators) return null;

  return (
    <>
     {generators.map(({generatorName, generatorId}) => (<option key={generatorId} value={generatorId}>{generatorName}</option>))}
    </>
  )
}

export default GeneratorOptions


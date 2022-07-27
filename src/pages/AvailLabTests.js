import React from 'react'
import { useParams } from 'react-router-dom';

export const AvailLabTests = () => {
  let params = useParams();
  return <h2>Lab Id: {params.labId}</h2>
  
}

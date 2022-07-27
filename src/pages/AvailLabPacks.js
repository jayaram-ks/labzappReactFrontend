import React from 'react'
import { useParams } from 'react-router-dom';

export const AvailLabPacks = () => {
  let params = useParams();
  return (
    <div>Labz Id: {params.labId}</div>
  )
}

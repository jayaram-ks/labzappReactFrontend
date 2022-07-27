import React from 'react'
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
export const LabSingle = ({labdata}) => {
  return (
    <div className='col-lg-3 col-md-6 col-sm-12 p-2' >
    <Card  className='lab-box'>
        <Card.Img className='lab-img' variant="top" src={labdata?.thumbnail} />
        <Card.Body>
          <Card.Title className='lab-title prim-colr'>{labdata?.name}</Card.Title>
          <Card.Text className='lab-address light-black'>
            {labdata?.address}
          </Card.Text>
          
          <Link to={`/labs/tests/${labdata.lab_id}`}> <Button className="btn-danger btn-sm w-100 mb-1">Available Tests</Button>  </Link>
         
          
          <Link to={`/labs/packs/${labdata.lab_id}`} > <Button className="btn-success btn-sm w-100 mb-1">Available Packages</Button> </Link>
        
        </Card.Body>
      </Card>
    </div>
  )
}

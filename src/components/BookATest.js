import React from 'react'
import { Card } from 'react-bootstrap'

export const BookATest = () => {
  return (
    <div className="text-center">
      <Card className="btn-card">
        <Card.Body><i className="fa fa-book"></i> Book A Test</Card.Body>
      </Card>
    </div>
  )
}
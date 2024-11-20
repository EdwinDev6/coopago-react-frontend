import React from 'react'
import { useState, useCallback } from 'react'
import { SelectInput } from '../Inputs/SelectInput'
export const RegisterBeneficiary = () => {
  const [elementValue, setElementValue] = useState("")


  const handleElementChange = useCallback((event) => {

  }, [elementValue])
  const handleInputChange = useCallback(() => {
    const {name, value} = e.target
    setFormData({
      ...formData, [name]: value
    })
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventByDefault();
    console.log("Form data", formData)
  })
  return (
    <form onSubmit={handleSubmit}>
      <SelectInput label="Elementos" name="element" value={elementValue} selected="ELEGIR ELEMENTO" onChange={handleElementChange} filter="ELEMENTOS"/>
    </form>
  )
}

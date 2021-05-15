import React from 'react'
import PDFReader from 'rn-pdf-reader-js'
import { getValue } from '../DataStore/Storage'

export default function ViewPdf({ navigation }) {
  const pdf = getValue('pdf')

  return (
    <PDFReader
      source={{
        uri: pdf,
      }}
    />
  )
}

import React from 'react'
import { ScrollView, View, } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { setValue, getValue } from '../DataStore/Storage'

export default function ViewPdf ({ navigation }) {
const pdf =  getValue('pdf')

return (
    
<PDFReader
source={{
uri: pdf,
}}
/>
)
}
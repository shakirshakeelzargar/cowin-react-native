import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Surface, Text as TextPaper } from 'react-native-paper'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { getCalenderByPin } from '../DataStore/API'

const CheckAvailability = ({ navigation }) => {
  const getDate = (v) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const currentTime = new Date()

    const ISTTime = new Date(
      currentTime.getTime() + (330 + currentTime.getTimezoneOffset()) * 60000
    )
    const new_date = new Date(ISTTime.getTime() + 86400000 * v)
    const dayName = days[new_date.getDay()]
    const monthName = months[new_date.getMonth()]
    const date = new_date.getDate()

    return { dayName, monthName, date }
  }
  const [data, setData] = useState('no data yet')
  const onGetCalender = async () => {
    const response = await getCalenderByPin('191131')
    console.log(response)
    setData(JSON.stringify(response))
  }
  return (
    <View>
      <BackButton
        goBack={() => {
          navigation.navigate('Dashboard')
        }}
      />
      <Button
        mode="contained"
        onPress={onGetCalender}
        style={{ marginTop: '30%' }}
      >
        Get Calender
      </Button>

      <View style={styles.dates}>
        {[0, 1, 2, 3, 4, 5, 6].map((v) => (
          <Surface style={styles.surface} key={v}>
            <TextPaper style={{ color: 'white' }}>
              {getDate(v).dayName}
            </TextPaper>
            <TextPaper style={{ color: 'white' }}>
              {getDate(v).monthName} {getDate(v).date}
            </TextPaper>
          </Surface>
        ))}
      </View>
      <View style={styles.row}>
        <View>
          <Text>Center Name</Text>
          <Text>45+</Text>
          <Text>Free</Text>
        </View>
        <View style={styles.rowSlots}>
          {[0, 1, 2, 3, 4, 5, 6].map((v) => (
            <Surface style={styles.slotsSurface} key={v}>
              <TextPaper style={{ color: 'white' }}>50</TextPaper>
            </Surface>
          ))}
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text>{data}</Text>
      </ScrollView>
    </View>
  )
}

export default CheckAvailability

const styles = StyleSheet.create({
  surface: {
    // padding: 8,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 10,
    display: 'flex',
    backgroundColor: '#560CCE',
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scrollView: {
    marginTop: '3%',
  },
  slotsSurface: {
    backgroundColor: '#018f51',
    height: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 10,
  },
  rowSlots: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

/* eslint-disable no-unused-vars */
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Surface, Text as TextPaper } from 'react-native-paper'
import { getValue } from '../DataStore/Storage'

export default function AvailabilityRow({
  slot_data,
  hideModal,
  showModal,
  setModalContent,
  derivedAgeProp,
}) {
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
    const monthName = months[new_date.getMonth() + 1]
    const date = new_date.getDate()
    const fullDate = `${('0' + new_date.getDate()).slice(-2)}-${(
      '0' +
      (new_date.getMonth() + 1)
    ).slice(-2)}-${new_date.getFullYear()}`
    // console.log({ dayName, monthName, date, fullDate })
    return { dayName, monthName, date, fullDate }
  }

  return (
    <View>
      <Surface style={styles.rowSurface}>
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowHeaderText}>{slot_data.name}</Text>
            <Text style={styles.rowHeaderText}>
              {derivedAgeProp + '+'} & {slot_data.fee_type}
            </Text>
          </View>
          <View style={styles.rowSlots}>
            {[0, 1, 2, 3, 4, 5, 6].map((v, i) => {
              const todays_date = getDate(v).date
              const fullDate = getDate(v).fullDate
              //   console.log(fullDate)
              let todays_session = slot_data.sessions.filter(
                (e) => e.date === fullDate
              )
              todays_session = todays_session[0]
                ? todays_session[0]
                : { date: 0 }
              let slotValue = 0
              //   console.log(fullDate, todays_session.date)
              if (fullDate === todays_session.date) {
                if (todays_session.date.split('-')[0]) {
                  slotValue = todays_session.available_capacity
                }
              }
              return (
                <Surface
                  style={{
                    backgroundColor: slotValue > 0 ? '#018f51' : 'grey',
                    height: 20,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                    borderRadius: 10,
                  }}
                  key={i}
                >
                  <TextPaper
                    style={{ color: 'white', fontSize: 15 }}
                    onPress={() => {
                      // console.log(todays_session)
                      setModalContent(todays_session)
                      showModal()
                    }}
                  >
                    {slotValue}
                  </TextPaper>
                </Surface>
              )
            })}
          </View>
        </View>
      </Surface>
    </View>
  )
}

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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  rowHeaderText: { fontSize: 15, fontWeight: 'bold' },
  rowSurface: {
    // padding: 8,
    // height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 10,
    marginBottom: 7,
  },
  row: { width: '100%', paddingTop: 5, paddingBottom: 5 },
})

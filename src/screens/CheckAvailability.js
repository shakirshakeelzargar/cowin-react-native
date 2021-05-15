/* eslint-disable react/jsx-boolean-value */
/* eslint-disable radix */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import {
  Surface,
  Text as TextPaper,
  Button as ButtonPaper,
  Modal,
  Portal,
  Provider,
} from 'react-native-paper'
import useIsMounted from 'ismounted'
// import { StackActions, NavigationActions } from 'react-navigation';
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Header from '../components/Header'
import { getCalenderByPin } from '../DataStore/API'
import Background from '../components/Background'
import AvailabilityRow from '../components/AvailabilityRow'
import { getValue, setValue } from '../DataStore/Storage'
import HeaderNavBar from '../components/HeaderNavBar'

const CheckAvailability = ({ navigation }) => {
  // const isMounted = useIsMounted()
  const [slots, setSlots] = useState('loading')
  const [isCallData, setIsCallData] = useState(true)
  const [derivedAge, setDerivedAge] = useState('')
  const [derivedVaccine, setDerivedVaccine] = useState('')
  const [filterChanged, setFilterChanged] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const firstUpdate = useRef(true)

  const getFilters = async () => {
    const derived_age = await getValue('age_filter')
    const derived_vaccine = await getValue('vaccine_filter')
    setDerivedAge(derived_age)
    setDerivedVaccine(derived_vaccine)
  }
  getFilters()
  const getSlotData = async () => {
    // const response = await getCalenderByPin('190001')
    const filtered_data = await getValue('filtered_data')
    // console.log(JSON.parse(filtered_data))
    setSlots(JSON.parse(filtered_data))
  }
  useEffect(() => {
    // if (isMounted.current) {
    const callData = async () => {
      const temp = await getSlotData()
    }
    callData()
    // }
  }, [])
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
  // const [data, setData] = useState('no data yet')
  // const onGetCalender = async () => {
  //   const response = await getCalenderByPin('191131')
  //   // console.log(response)
  //   setData(JSON.stringify(response))
  // }

  const [filters, setFilters] = useState({
    eighteen: false,
    fourtyFive: false,
    covaxin: false,
    covisheild: false,
  })

  const filterData = (dataaaa) => {
    // console.log('Filtering', derivedAge, ' ', derivedVaccine)
    // console.log(dataaaa)
    let tempData = dataaaa
    const filtered_data = []
    for (let i = 0; i < tempData.length; i++) {
      const center = tempData[i]
      const sessions = center.sessions
      // console.log(sessions)
      const filtered_session = sessions.filter(
        (e) =>
          e.vaccine === derivedVaccine &&
          e.min_age_limit === parseInt(derivedAge)
      )
      // console.log(filtered_session)
      //   tempData = JSON.parse(tempData)
      tempData[i].sessions = filtered_session
      //   tempData = JSON.stringify(tempData)
    }
    // tempData = JSON.parse(tempData)
    tempData = JSON.stringify(tempData)
    // console.log(tempData)
    return tempData
  }

  useEffect(() => {
    if (!firstTime) {
      const updateData = async () => {
        const unfiltered_data = await getValue('uuunfiltered_data')
        // console.log(unfiltered_data)
        const filtered_data = filterData(JSON.parse(unfiltered_data))
        setSlots(JSON.parse(filtered_data))
        // console.log(JSON.parse(filtered_data))
      }
      setSlots('loading')
      updateData()
    } else {
      setFirstTime(false)
    }
  }, [filterChanged])

  const handleFilterChange = async (fil) => {
    switch (fil) {
      case 'covaxin':
        setFilters({ ...filters, covaxin: !filters[fil] })
        const tempp2 = await setValue('vaccine_filter', 'COVAXIN')
        setDerivedVaccine('COVAXIN')
        setFilterChanged(!filterChanged)
        break
      case 'covisheild':
        setFilters({ ...filters, covisheild: !filters[fil] })
        const tempp3 = await setValue('vaccine_filter', 'COVISHIELD')
        setDerivedVaccine('COVISHIELD')
        setFilterChanged(!filterChanged)
        break
      case 'eighteen':
        setFilters({ ...filters, eighteen: !filters[fil] })
        const tempp4 = await setValue('age_filter', '18')
        setDerivedAge('18')
        setFilterChanged(!filterChanged)
        break
      case 'fourtyFive':
        setFilters({ ...filters, fourtyFive: !filters[fil] })
        const tempp5 = await setValue('age_filter', '45')
        setDerivedAge('45')
        setFilterChanged(!filterChanged)
        break
    }
  }

  const [visible, setVisible] = React.useState(false)
  const [modalContent, setModalContent] = React.useState({ slots: [] })
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {modalContent.date !== 0 && (
            <View>
              <Text style={styles.modaltext}>Date: {modalContent.date}</Text>
              <Text style={styles.modaltext}>
                Available Capacity: {modalContent.available_capacity}
              </Text>
              <Text style={styles.modaltext}>
                Age Limit: {modalContent.min_age_limit}
              </Text>
              <Text style={styles.modaltext}>
                Vaccine: {modalContent.vaccine}
              </Text>
              {modalContent.slots.map((v, i) => (
                <Text style={styles.modaltext} key={i}>
                  Slot {i + 1}: {modalContent.slots[i]}
                </Text>
              ))}
              <Button
                mode="contained"
                onPress={() => {
                  hideModal()
                  navigation.navigate('WebViewRegistration')
                }}
              >
                Book Slot
              </Button>
            </View>
          )}
          {modalContent.date === 0 && (
            <View>
              <Text style={styles.modaltextRed}>No Slots Available</Text>
            </View>
          )}

          {/* <Text>Date: {modalContent}</Text> */}

          <Button
            mode="contained"
            onPress={() => {
              hideModal()
            }}
          >
            Hide
          </Button>
        </Modal>
      </Portal>

      <View>
        {/* <Button
        mode="contained"
        onPress={onGetCalender}
        style={{ marginTop: '10%' }}
      >
        Get Calender
      </Button> */}
        <HeaderNavBar
          navigation={navigation}
          goBack={true}
          resetScreen={true}
          whichScreen="SearchSlots"
        />
        <View style={styles.filters}>
          <ButtonPaper
            mode={derivedAge === '18' ? 'contained' : 'outlined'}
            onPress={() => handleFilterChange('eighteen')}
          >
            {' '}
            18+
          </ButtonPaper>
          <ButtonPaper
            mode={derivedAge === '45' ? 'contained' : 'outlined'}
            onPress={() => handleFilterChange('fourtyFive')}
          >
            {' '}
            45+
          </ButtonPaper>
          <ButtonPaper
            mode={derivedVaccine === 'COVAXIN' ? 'contained' : 'outlined'}
            onPress={() => handleFilterChange('covaxin')}
          >
            {' '}
            Covaxin
          </ButtonPaper>
          <ButtonPaper
            mode={derivedVaccine === 'COVISHIELD' ? 'contained' : 'outlined'}
            onPress={() => handleFilterChange('covisheild')}
          >
            {' '}
            Covisheild
          </ButtonPaper>
        </View>
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
        <ScrollView contentInset={{ bottom: 300 }}>
          {slots.length > 0 && slots !== 'loading' ? (
            slots.map((slot, i) => (
              <AvailabilityRow
                slot_data={slot}
                hideModal={hideModal}
                showModal={showModal}
                setModalContent={setModalContent}
                key={i}
                derivedAgeProp={derivedAge}
              />
            ))
          ) : slots === 'loading' ? (
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#5d00ff" />
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Header>No Data Found</Header>
            </View>
          )}
        </ScrollView>
      </View>
    </Provider>
  )
}

export default CheckAvailability

const styles = StyleSheet.create({
  modaltextRed: {
    backgroundColor: 'red',
    color: 'white',
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  modaltext: {
    backgroundColor: '#018f51',
    color: 'white',
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
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
    marginBottom: 10,
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
    width: Dimensions.get('window').width - 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowHeader: {
    width: Dimensions.get('window').width - 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowHeaderText: { fontSize: 15, fontWeight: 'bold' },
  rowSurface: {
    // padding: 8,
    // height: 80,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 10,
  },
  row: { width: Dimensions.get('window').width - 20 },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 25,
  },
})

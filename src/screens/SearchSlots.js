/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { Snackbar, TextInput as TextInputDefault } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import {
  getCalenderByPin,
  getStates,
  getDistrictsByState,
  getCalenderByDistrict,
} from '../DataStore/API'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import Button from '../components/Button'
import Header from '../components/Header'
import { otpValidator } from '../helpers/otpValidator'
import { setValue } from '../DataStore/Storage'
import HeaderNavBar from '../components/HeaderNavBar'

const SearchSlots = ({ navigation }) => {
  const [showPin, setShowPin] = useState(false)
  const [showDistrict, setShowDistrict] = useState(false)
  const [visible, setVisible] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const onToggleSnackBar = () => setVisible(!visible)
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(false)
  const onDismissSnackBar = () => setVisible(false)
  const [showAgeDropdown, setShowAgeDropdown] = useState(false)

  const [age, setAge] = useState(undefined)

  const ageList = [
    { label: '18+', value: 18 },

    { label: '45+', value: 45 },
  ]

  const [showStateDropdown, setShowStateDropdown] = useState(false)

  const [state, setState] = useState(undefined)

  const [stateList, setStateList] = useState([])

  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)

  const [district, setDistrict] = useState(undefined)

  const [districtList, setDistrictList] = useState([])

  const [showSearchByDropdown, setShowSearchByDropdown] = useState(false)

  const [searchBy, setSearchBy] = useState(undefined)

  const searhByList = [
    { label: 'Pincode', value: 'pincode' },

    { label: 'State / District', value: 'district' },
  ]

  const [showVaccineDropdown, setShowVaccineDropdown] = useState(false)

  const [vaccine, setVaccine] = useState(undefined)

  const vaccineList = [
    { label: 'Covaxin', value: 'COVAXIN' },

    { label: 'Covishield', value: 'COVISHIELD' },
  ]
  const [pincode, setPincode] = useState({ value: '', error: '' })
  const [unfilteredData, setUnfilteredData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const filterData = (data) => {
    // console.log("Filtering with",vaccine,age)
    // console.log(JSON.stringify(data))
    let tempData = data
    const filtered_data = []
    for (let i = 0; i < data.length; i++) {
      const center = data[i]
      const sessions = center.sessions
      const filtered_session = sessions.filter(
        (e) => e.vaccine === vaccine && e.min_age_limit === age
      )
      // // console.log("Filtered")
      //   tempData = JSON.parse(tempData)
      tempData[i].sessions = filtered_session
      //   tempData = JSON.stringify(tempData)
    }
    // tempData = JSON.parse(tempData)
    tempData = JSON.stringify(tempData)
    setFilteredData(tempData)
    return tempData
  }
  // eslint-disable-next-line consistent-return
  const startSearch = async () => {
    const tempp = await setValue('age_filter', String(age))
    const tempp2 = await setValue('vaccine_filter', vaccine)
    // const removeTemp = await removeValue('filtered_data')
    if (showPin) {
      const pincodeError = otpValidator(pincode.value)
      if (pincodeError) {
        setPincode({ ...pincode, error: pincodeError })
        return ''
      }
      Keyboard.dismiss()
      if (!vaccine && !age) {
        setSnackMessage('Please select Age and Vaccine')
        setVisible(true)
        return ''
      }
      if (!vaccine) {
        setSnackMessage('Please select Vaccine')
        setVisible(true)
        return ''
      }
      if (!age) {
        setSnackMessage('Please select Age')
        setVisible(true)
        return ''
      }
      setSearchButtonDisabled(true)
      console.log(age, vaccine)
      const response = await getCalenderByPin(pincode.value)
      // console.log("Hereeeee: ",JSON.stringify(response.data))
      const temp2 = await setValue(
        'uuunfiltered_data',
        JSON.stringify(response.data || [])
      )
      // // console.log('this is', JSON.stringify(response.data))
      // console.log("I am here")
      if (response.error || !response.data) {
        // console.log("Somethis is wtong")
        setSnackMessage(`Error: ${response.message || 'Some error occured'}`)
        setVisible(true)
        setSearchButtonDisabled(false)
      } else {
        // console.log("Nothing is wrong")
        // setUnfilteredData(response.data)
        // console.log(JSON.stringify(response.data))
        const filtered_data = filterData(response.data)
        // // console.log({ filteredData })
        const temp = await setValue('filtered_data', filtered_data)

        setSearchButtonDisabled(false)
        navigation.navigate('CheckAvailability')
      }
    } else if (showDistrict) {
      Keyboard.dismiss()
      if (!vaccine || !age) {
        setSnackMessage('Please select Age and Vaccine')
        setVisible(true)
      } else if (!state) {
        setSnackMessage('Please select State')
        setVisible(true)
      } else if (!district) {
        setSnackMessage('Please select District')
        setVisible(true)
      }
      setSearchButtonDisabled(true)
      const response = await getCalenderByDistrict(state, district)
      //   // console.log('With District id ', district, JSON.stringify(response.data))
      const temp2 = await setValue(
        'uuunfiltered_data',
        JSON.stringify(response.data || [])
      )
      // // console.log('this is', JSON.stringify(response.data))
      if (response.error || !response.data) {
        setSnackMessage(`Error: ${response.message || 'Some error occured'}`)
        setVisible(true)
        setSearchButtonDisabled(false)
      } else {
        setUnfilteredData(response.data)
        const filtered_data = filterData(response.data)
        // // console.log({ filteredData }, { unfilteredData }, { filtered_data })
        const temp = await setValue('filtered_data', filtered_data)

        setSearchButtonDisabled(false)
        navigation.navigate('CheckAvailability')
      }
    }
  }
  useEffect(() => {
    if (searchBy) {
      if (searchBy === 'pincode') {
        setShowDistrict(false)
        setShowPin(true)
      } else if (searchBy === 'district') {
        setShowDistrict(true)
        setShowPin(false)
      }
    }
  }, [searchBy])

  useEffect(() => {
    if (showDistrict) {
      const loadStates = async () => {
        const responsee = await getStates()
        const filteredStates = responsee.map((v) => ({
          label: v.state_name,
          value: v.state_id,
        }))
        setStateList(filteredStates)
      }
      if (showDistrict === true) {
        loadStates()
      }
    }
  }, [showDistrict])

  useEffect(() => {
    if (state) {
      const loadDistricts = async () => {
        const responsee = await getDistrictsByState(String(state))
        const filteredDistricts = responsee.map((v) => ({
          label: v.district_name,
          value: v.district_id,
        }))
        setDistrictList(filteredDistricts)
      }
      loadDistricts()
    }
  }, [state])

  return (
    <View style={styles.root}>
      <Background onPress={() => Keyboard.dismiss()}>
        <HeaderNavBar
          navigation={navigation}
          goBack={true}
          resetScreen={true}
          whichScreen="Dashboard"
        />
        {/* <BackButton
          goBack={() => {
            navigation.navigate('Dashboard')
          }}
        /> */}
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Dismiss',
            onPress: () => {
              // Do something
            },
          }}
        >
          {snackMessage}
        </Snackbar>
        {/* <BackButton
        goBack={() => {
          navigation.navigate('Dashboard')
        }}
      /> */}
        {/* <Logo /> */}
        <Header>Search Vaccination Slots</Header>
        {/* <Paragraph>Get yourself Vaccinated</Paragraph> */}
        <View style={{ width: '100%' }}>
          <DropDown
            label="Search By"
            mode="outlined"
            value={searchBy}
            setValue={setSearchBy}
            list={searhByList}
            visible={showSearchByDropdown}
            showDropDown={() => {
              Keyboard.dismiss()
              setShowSearchByDropdown(true)
            }}
            onDismiss={() => setShowSearchByDropdown(false)}
            inputProps={{
              right: <TextInputDefault.Icon name="menu-down" />,
            }}
          />
        </View>
        {showPin && (
          <View style={{ width: '100%' }}>
            <DropDown
              label="Age"
              mode="outlined"
              value={age}
              setValue={setAge}
              list={ageList}
              visible={showAgeDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowAgeDropdown(true)
              }}
              onDismiss={() => setShowAgeDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />

            <DropDown
              label="Vaccine"
              mode="outlined"
              value={vaccine}
              setValue={setVaccine}
              list={vaccineList}
              visible={showVaccineDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowVaccineDropdown(true)
              }}
              onDismiss={() => setShowVaccineDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />
            <TextInput
              style={{ marginTop: 7 }}
              label="Pin Code"
              value={pincode.value}
              onChangeText={(text) => {
                //   // console.log(pincode)
                setPincode({ value: text, error: '' })
              }}
              error={!!pincode.error}
              errorText={pincode.error}
              autoCapitalize="none"
            />
          </View>
        )}

        {showDistrict && (
          <View style={{ width: '100%' }}>
            <DropDown
              label="Age"
              mode="outlined"
              value={age}
              setValue={setAge}
              list={ageList}
              visible={showAgeDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowAgeDropdown(true)
              }}
              onDismiss={() => setShowAgeDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />

            <DropDown
              label="Vaccine"
              mode="outlined"
              value={vaccine}
              setValue={setVaccine}
              list={vaccineList}
              visible={showVaccineDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowVaccineDropdown(true)
              }}
              onDismiss={() => setShowVaccineDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />
            <DropDown
              label="State"
              mode="outlined"
              value={state}
              setValue={setState}
              list={stateList}
              visible={showStateDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowStateDropdown(true)
              }}
              onDismiss={() => setShowStateDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />

            <DropDown
              label="District"
              mode="outlined"
              value={district}
              setValue={setDistrict}
              list={districtList}
              visible={showDistrictDropdown}
              showDropDown={() => {
                Keyboard.dismiss()
                setShowDistrictDropdown(true)
              }}
              onDismiss={() => setShowDistrictDropdown(false)}
              inputProps={{
                right: <TextInputDefault.Icon name="menu-down" />,
              }}
            />
          </View>
        )}
        {(showPin || showDistrict) && (
          <Button
            disabled={searchButtonDisabled}
            mode="contained"
            onPress={() => {
              startSearch()
            }}
          >
            Search
          </Button>
        )}
      </Background>
    </View>
  )
}

export default SearchSlots

const styles = StyleSheet.create({ root: { width: '100%', height: '100%' } })

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, HelperText, Menu, Divider, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function AddEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [foodType, setFoodType] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);      
  const [menuVisible, setMenuVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const isFormValid = () => {
    return eventName && eventLocation && eventTime && foodType && eventDescription;
  };

  const addEvent = () => {
    if (isFormValid()) {
      // Add event to database
      console.log('Event added');
      // Navigate back to home screen
      const navigation = useNavigation();
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HelperText type="error" visible={!eventName}>
       Event name is required
      </HelperText>
      <TextInput
        label="Event Name"
        value={eventName}
        onChangeText={text => setEventName(text)}
        style={styles.inputField}
      />
      <HelperText type="error" visible={false}> {/* Add validation */}
        Event name is required
      </HelperText>

      <TextInput
        label="Event Location"
        value={eventLocation}
        onChangeText={text => setEventLocation(text)}
        style={styles.inputField}
      />
      <HelperText type="error" visible={false}> {/* Add validation */}
        Location is required
      </HelperText>

      {/* DateTime Picker */}
      <View>
        <Button onPress={showDatepicker} title="Pick a Date and Time" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button onPress={() => setMenuVisible(true)}>
            {foodType || 'Select Food Type'}
          </Button>
        }
      >
        <Menu.Item onPress={() => { setFoodType('Vegan'); setMenuVisible(false); }} title="Vegan" />
        <Divider />
        <Menu.Item onPress={() => { setFoodType('Vegetarian'); setMenuVisible(false); }} title="Vegetarian" />
        <Divider />
        <Menu.Item onPress={() => { setFoodType('Non-Vegetarian'); setMenuVisible(false); }} title="Non-Vegetarian" />
      </Menu>
      
      <TextInput
        label="Event Description"
        value={eventDescription}
        onChangeText={text => setEventDescription(text)}
        multiline={true}
        numberOfLines={4}
        style={styles.inputField}
      />

      <Button mode="contained" onPress={addEvent} style={styles.addButton}>
        Add Event
      </Button>
      <Button mode="outlined" onPress={() => {}} style={styles.cancelButton}>
        Cancel
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputField: {
    marginBottom: 16,
  },
  addButton: {
    marginVertical: 16,
  },
  cancelButton: {
    marginVertical: 16,
  },
});
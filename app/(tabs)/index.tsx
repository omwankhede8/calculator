import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// App component
export default function App(): JSX.Element {
  const [display, setDisplay] = useState<string>('0');

  const handlePress = (value: string): void => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else if (value === '⬅') {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else {
      setDisplay((prev) => (prev === '0' ? value : prev + value));
    }
  };

  const buttons = [
    ['C', '⬅', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={buttonIndex}
                style={[styles.button, button === '=' && styles.equalsButton]}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

// Stylesheet macro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#000',
  },
  display: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: {
    flex: 1,
    margin: 5,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  equalsButton: {
    backgroundColor: '#f09a36',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

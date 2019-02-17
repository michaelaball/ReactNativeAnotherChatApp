import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

class Main extends Component {
  onChangeText = name => this.setState({ name });
  onPress = () => {
    this.props.navigation.navigate('Chat', { name: this.state.name });
  }
  state = { name: '' }
  render() {
    return (
      <View>
      <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          onChangeText={this.onChangeText}
          style={styles.nameInput}
          placeHolder="Fornojus"
          value={this.state.name}
          />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset *2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth:1,
  },
})

export default Main;

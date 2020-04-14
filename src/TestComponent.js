import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 1
    };
  }

  componentDidMount() {
    console.log("Componente montado");
  }

  componentWillUnmount() {
    console.log("Se desmontará el componente");
  }

  incrementNumber = () => {
    this.setState({
      numero: this.state.numero + 1
    });
    console.log("Incrementando componente", this.props.id, "...", "numero: ", this.state.numero);
  }

  decrementNumber = () => {
    this.setState({
      numero: this.state.numero - 1
    });
    console.log("Decrementando componente", this.props.id, "...", "numero: ", this.state.numero);
  }


  render() {
    return (
      <>
        <Text style={styles.text}>Número: {this.state.numero} [Componente {this.props.id}]</Text>
        <View style={styles.fixToText}>
          <Button
            title="Incrementar"
            onPress={this.incrementNumber}
          />
          <Button
            title="Decrementar"
            onPress={this.decrementNumber}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
export default class Ap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      nome: "",
    };
    this.enviar = this.enviar.bind(this);
  }
  //Quando monta a tela do app esse cara renderiza,ou seja ele monta aplicação
  //Sem esse cara não consigo montar na tela
  async componentDidMount() {
    await AsyncStorage.getItem("nome").then((value) =>
      this.setState({
        nome: value,
      })
    );
  }

  //Quando muda o estado ou atualiza esse cara e renderizado
  async componentDidUpdate(_, prevState) {
    let nome = this.state.nome;
    //nome é o valor key que enviamos para o Storage,e o nome que sera recuperado
    // em a getItem
    if (prevState !== nome) {
      await AsyncStorage.setItem("nome", nome);
    }
  }

  enviar() {
    this.setState({ nome: this.state.input });
    Keyboard.dismiss();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(item) => this.setState({ input: item })}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={this.enviar}>
            <Text style={styles.botao}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.nome}>{this.state.nome}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 350,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
  },
  botao: {
    backgroundColor: "#222",
    color: "#FFF",
    height: 40,
    padding: 10,
    marginLeft: 4,
  },
  nome: {
    marginTop: 15,
    fontSize: 30,
    textAlign: "center",
  },
});

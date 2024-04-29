import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import ItemLista from "../ItemLista/ItemLista";
import axios from 'axios';

function Home({ navigation }) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await axios.get('http://192.168.1.7:3000/times');
        setTimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar times:', error);
      }
    };

    fetchTimes();
  }, []);

  return (
    <SafeAreaView>
      <Text>Lista de times:</Text>
      <ScrollView>
        {times.map((time) => (
          <Pressable key={time.id} onPress={() => {
            navigation.navigate('TelaTime', {
              time: time.nome,
              img: `http://192.168.1.7:3000/imagens/${time.imagem}`,
            })
          }}>
            <ItemLista
              nome={time.nome}
              img={`http://192.168.1.7:3000/imagens/${time.imagem}`}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

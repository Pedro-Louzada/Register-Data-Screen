import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TouchableOpacity } from "react-native";

/*
📚 FlatList me retorna um array com algumas propriedades e os dados fica na propriedade item, 
por isso dar um destruction somente em item no parâmetro do componente
*/

export const ToggleItem = ({ item }) => {
  const [hideValueTag, setHideValueTag] = useState(true);
  
  return (
    <TouchableOpacity
      style={styles.containerItens}
      key={String(item.id)}
      onPress={() => setHideValueTag(!hideValueTag)}
    >
      <Text style={styles.dateOfRegisterItem}>26/03/2024</Text>
      <View style={styles.contentContainerItens}>
        <Text style={styles.labelOfRegisterItem}>{item.nameOfTag}</Text>
        {hideValueTag ? (
          <View style={styles.skeleton} />
        ) : (
          <Text
            style={
              item.tagSelected === 0
                ? styles.valueOfRegisterItem
                : styles.expenses
            }
          >
            {item.tagSelected === 0
              ? `R$ ${item.valueOfTag}`
              : `R$ -${item.valueOfTag}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItens: {
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DADADA",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dateOfRegisterItem: {
    color: "#C8C8C8",
    fontWeight: "bold",
    fontFamily: "Sora_400Regular",
  },
  contentContainerItens: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 8,
  },
  labelOfRegisterItem: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Sora_400Regular",
  },
  skeleton: {
    marginTop: 10,
    width: 80,
    height: 10,
    backgroundColor: "#DADADA",
    borderRadius: 8,
  },
  valueOfRegisterItem: {
    fontSize: 16,
    color: "#2ECC71",
    fontWeight: "bold",
    fontFamily: "Sora_400Regular",
  },
  expenses: {
    fontSize: 16,
    color: "#E74C3C",
    fontWeight: "bold",
    fontFamily: "Sora_400Regular",
  },
  lisOfRegisterItens: {
    marginTop: 20,
    flex: 1,
  },
});

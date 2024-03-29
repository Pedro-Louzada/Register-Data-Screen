import { TextInput, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useState } from "react";

export const BottomSheetComponent = ({close}) => {
  const [secondScreenBottomSheet, setSecondScreenBottomSheet] = useState(false);
  const [tagSelected, setTagSelected] = useState("");
  const [valueOfTag, setValueOfTag] = useState("R$ 0,00");
  const [nameOfTag, setNameOfTag] = useState("");

  const optionsTag = [
    {
      key: 0,
      value: "Renda Mensal",
    },
    {
      key: 1,
      value: "Dispesa Fixa",
    },
    {
      key: 2,
      value: "Dispesa Variada",
    },
    {
      key: 3,
      value: "Dispesa Recorrentes",
    },
  ];

  const updateDateIntoWallet = (value, name, tag) => {
    const idRandom = Math.floor(Math.random() * 100) + 1;
    const formatedValue = value.replace(/[^0-9 \,\.]+/gm, "").trim();
    const newObj = {
      id: idRandom,
      valueOfTag: formatedValue,
      nameOfTag: name,
      tagSelected: tag,
    };
    setSendWalletInfoUser([...sendWalletInfoUser, newObj]);
    setNameOfTag("");
    setValueOfTag("R$ 0,00");
    setTagSelected("");
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.bottomSheet}>
        <ScrollView>
          {!secondScreenBottomSheet ? (
            <View style={styles.contentContainerSheet}>
              <Text style={styles.textIntoBottomSheet}>Insira o valor</Text>
              <TextInputMask
                type="money"
                style={{
                  fontFamily: "Sora_400Regular",
                  fontSize: 40,
                }}
                options={{
                  // maskType: "BRL",
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "R$ ",
                  suffixUnit: "",
                }}
                value={valueOfTag}
                onChangeText={(text) => setValueOfTag(text)}
              />
              <Text style={styles.textIntoBottomSheet}>
                Defina um nome para sua receita
              </Text>
              <TextInput
                placeholder="Nome da transação"
                style={{
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#DADADA",
                  borderRadius: 10,
                }}
                placeholderTextColor="#000"
                value={nameOfTag}
                onChangeText={(text) => setNameOfTag(text)}
              />
              <Text style={styles.textIntoBottomSheet}>Selecione sua tag</Text>
              <SelectList
                data={optionsTag}
                setSelected={(k) => setTagSelected(k)}
                //o que eu vou salvar no estado coloco aqui
                search={false}
                save="key"
                placeholder="Tag"
                arrowicon={
                  <Octicons name="chevron-up" size={18} color="black" />
                }
                closeicon={
                  <Octicons name="chevron-down" size={18} color="black" />
                }
                boxStyles={{ paddingVertical: 20, borderColor: "#DADADA" }}
                dropdownItemStyles={{
                  borderBottomColor: "#DADADA",
                  borderBottomWidth: 0.5,
                }}
                dropdownTextStyles={{
                  paddingVertical: 10,
                  fontFamily: "Sora_400Regular",
                }}
                dropdownStyles={{ fontFamily: "Sora_400Regular" }}
              />
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 20,
                  alignItems: "center",
                  backgroundColor: "#007FC6",
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={() => {
                  updateDateIntoWallet(valueOfTag, nameOfTag, tagSelected);
                  setSecondScreenBottomSheet(!secondScreenBottomSheet);
                }}
              >
                <Text style={styles.textButtonsIntoBottomSheet}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 20,
                  alignItems: "center",
                }}
                onPress={close}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 16,
                  }}
                >
                  Voltar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
              <View
                style={{
                  borderRadius: 99,
                  width: 100,
                  height: 100,
                  backgroundColor: "#80AEC8",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <AntDesign
                  name="check"
                  size={40}
                  color={"#007FC6"}
                  style={{}}
                />
              </View>
              <Text style={styles.labelSucessRegister}>
                Seus dados foram cadastrados com sucesso!
              </Text>
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 20,
                  alignItems: "center",
                  backgroundColor: "#007FC6",
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={close}
              >
                <Text style={styles.textButtonsIntoBottomSheet}>Fechar</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "60%",
    backgroundColor: "#FFF",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentContainerSheet: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textIntoBottomSheet: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 20,
    fontFamily: "Sora_400Regular",
  },
  buttonOpenBottomSheet: {
    marginTop: 20,
    backgroundColor: "#F3F3F3",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  bodyButtomOpenBottomSheet: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSheet: {
    backgroundColor: "#FFF",
  },
  textOfButtonBottomSheet: {
    fontFamily: "Sora_400Regular",
    color: "#000",
    fontSize: 18,
    marginLeft: 10,
  },
  textButtonsIntoBottomSheet: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: 300,
    fontFamily: "Sora_400Regular",
  },
});

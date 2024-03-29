import { Text, TouchableOpacity } from "react-native";

export const CTAButton = () => {
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
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 20,
          alignItems: "center",
          backgroundColor: "#007FC6",
          borderRadius: 10,
          marginTop: 20,
        }}
        onPress={() => updateDateIntoWallet(valueOfTag, nameOfTag, tagSelected)}
      >
        <Text style={styles.textButtonsIntoBottomSheet}>Salvar</Text>
      </TouchableOpacity>
    );
}
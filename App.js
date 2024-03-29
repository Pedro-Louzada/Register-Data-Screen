import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Sora_400Regular,
  Sora_500Medium,
  Sora_700Bold,
} from "@expo-google-fonts/sora";
import * as Font from "expo-font";
import { TextInputMask } from "react-native-masked-text";
import { ToggleItem } from "./src/components/ToggleItem";
import { BottomSheetComponent } from "./src/components/BottomSheet";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // const bottomSheetRef = useRef(null);

  // const [tagSelected, setTagSelected] = useState("");
  // const [valueOfTag, setValueOfTag] = useState("R$ 0,00");
  // const [nameOfTag, setNameOfTag] = useState("");
  // const [sendWalletInfoUser, setSendWalletInfoUser] = useState([]);
  // const [secondScreenBottomSheet, setSecondScreenBottomSheet] = useState(false);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  // const snapPoints = useMemo(() => ["32.5%", "65%"], []);
  // const snapPointsSecondScreen = useMemo(() => ["17.5%", "35%"], []);

  // useEffect(() => {
  //   console.log(sendWalletInfoUser);
  // }, [sendWalletInfoUser]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Sora_400Regular,
          Sora_500Medium,
          Sora_700Bold,
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // const handleClosePress = () => bottomSheetRef.current?.close();
  // const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleOpenPress = () => setOpenBottomSheet(true);
  const handleClosePress = () => setOpenBottomSheet(false);

  // const optionsTag = [
  //   {
  //     key: 0,
  //     value: "Renda Mensal",
  //   },
  //   {
  //     key: 1,
  //     value: "Dispesa Fixa",
  //   },
  //   {
  //     key: 2,
  //     value: "Dispesa Variada",
  //   },
  //   {
  //     key: 3,
  //     value: "Dispesa Recorrentes",
  //   },
  // ];

  // const updateDateIntoWallet = (value, name, tag) => {
  //   const idRandom = Math.floor(Math.random() * 100) + 1;
  //   const formatedValue = value.replace(/[^0-9 \,\.]+/gm, "").trim();
  //   const newObj = {
  //     id: idRandom,
  //     valueOfTag: formatedValue,
  //     nameOfTag: name,
  //     tagSelected: tag,
  //   };
  //   setSendWalletInfoUser([...sendWalletInfoUser, newObj]);
  //   setNameOfTag("");
  //   setValueOfTag("R$ 0,00");
  //   setTagSelected("");
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <View style={styles.mainViewApp}>
            <TouchableOpacity
              style={styles.buttonOpenBottomSheet}
              onPress={handleOpenPress}
            >
              <View style={styles.bodyButtomOpenBottomSheet}>
                <AntDesign.Button
                  name="linechart"
                  size={28}
                  color={"#007FC6"}
                  style={{ backgroundColor: "#80AEC8" }}
                />
                <Text style={styles.textOfButtonBottomSheet}>
                  Cadastrar dados
                </Text>
              </View>
              <View>
                <AntDesign name="plus" size={20} color="#80AEC8" />
              </View>
            </TouchableOpacity>
          </View>

          {openBottomSheet && <BottomSheetComponent close={handleClosePress} />}

          {/* <BottomSheet
            ref={bottomSheetRef}
            //index é em qual dos valor dos snapPoints o Bottom Sheet irá começar
            index={-1}
            snapPoints={
              !secondScreenBottomSheet ? snapPoints : snapPointsSecondScreen
            }
            backgroundStyle={styles.bottomSheet}
            onChange={(index) => {
              if (index === -1) {
                setSecondScreenBottomSheet(false);
              }
            }}
            style={{ zIndex: 9999 }}
            enablePanDownToClose={true}
          >
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
                  <Text style={styles.textIntoBottomSheet}>
                    Selecione sua tag
                  </Text>
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
                    <Text style={styles.textButtonsIntoBottomSheet}>
                      Salvar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      padding: 20,
                      alignItems: "center",
                    }}
                    onPress={handleClosePress}
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
                    onPress={handleClosePress}
                  >
                    <Text style={styles.textButtonsIntoBottomSheet}>
                      Fechar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </BottomSheet> */}

          {/* <Text style={styles.labelTag}>Rendal Mensal</Text>
          {sendWalletInfoUser.length > 0 ? (
            <FlatList
              data={sendWalletInfoUser}
              keyExtractor={(item) => String(item.id)}
              renderItem={(item) => <ToggleItem {...item} />}
            />
          ) : (
            <Text style={styles.labelEmptyWallet}>
              Cadastre dados a sua carteira
            </Text>
          )} */}

          <StatusBar style="light" />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECECEC",
    // paddingHorizontal: 20,
  },
  mainViewApp: {
    width: "100%",
    paddingHorizontal: 20,
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
  labelEmptyWallet: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 12,
    fontFamily: "Sora_400Regular",
  },
  labelTag: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 20,
    fontFamily: "Sora_400Regular",
  },
  labelSucessRegister: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Sora_400Regular",
  },
  lisOfRegisterItens: {
    marginTop: 20,
    flex: 1,
  },
});

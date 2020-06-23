import React, { useState, useEffect, useRef } from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreadCrumb from "../components/BreadCrumb";
import RadioButton from "../components/RadioButton.js";
import DateTime, { currentTime, currentDate } from "../components/DateTime.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CreateConsultFB from "../firebase/CreateConsultFireBase.js";
import Modal from "react-native-modal";
import MultiSelect from "react-native-multiple-select";

export default function CreateConsultScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    "Righteous-Regular": require("../assets/fonts/Righteous-Regular.ttf"),
  });

  const { firstScreen, secondScreen, thirdScreen, userID, bookingId, moduleCode, studentsInvolved, finalisedConsultType } = route.params;

  const navHistory = [
    { dest: firstScreen, alt_dest: "" },
    { dest: secondScreen, alt_dest: "Select Module" },
    { dest: thirdScreen, alt_dest: "" },
  ];

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [size, setSize] = useState("");
  const [consultType, setConsultType] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [participants, setParticipants] = useState([]); //participants (for public use and suggest use)
  const [userName, setUserName] = useState(""); // consists of id and name of current student user account
  const [studentList, setStudentList] = useState([]); // load in all students taking the same module dynamically(can be friends from other classes)
  const [selectedItems, setItems] = useState([]); // selected Students subject to remove or added dynamically
  const [selectedStudents, setSelectedStudents] = useState([]); // create a copy of the selected students

  const updateDate = (date) => {
    setDate(date);
  };

  const updateStartTime = (time) => {
    setStartTime(time);
  };

  const updateEndTime = (time) => {
    setEndTime(time);
  };

  const updateConsultType = (consultType) => {
    setConsultType(consultType);
  }; // handle callBack of button (public, private consult type)

  const type = [
    {
      name: "Public",
    },
    {
      name: "Private",
    },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [extraScrollHeight, setScrollHeight] = useState(0);

  const multiSelect = useRef(null);

  const onSelectedItemsChange = (selectedItems) => {
    setItems(selectedItems);
    var chosenStudents = [];
    if (selectedItems.length !== 0) {
      // array empty or does not exist
      for (var i = 0; i < selectedItems.length; i++) {
        var selectedStudentID = selectedItems[i];
        CreateConsultFB.checkUserData(selectedStudentID).then((data) => {
          chosenStudents.push(data);
          setSelectedStudents(chosenStudents.flatMap((x) => x)); // generate array of students involved in consultation
        });
      }
    }
  };

  const createConsultation = () => {
    consultType == "Public"
      ? CreateConsultFB.getWeekRange().then((weekRange) => {
          CreateConsultFB.addPublicBooking(
            userID,
            moduleCode,
            date,
            startTime,
            endTime,
            location,
            consultType,
            { id: userID, name: userName },
            size,
            agenda,
            "Pending",
            currentDate,
            currentTime,
            weekRange
          );
        })
      : CreateConsultFB.getWeekRange().then((weekRange) => {
          CreateConsultFB.addPrivateBooking(
            userID,
            moduleCode,
            date,
            startTime,
            endTime,
            location,
            consultType,
            { id: userID, name: userName },
            selectedStudents,
            selectedStudents.length,
            agenda,
            "Pending",
            currentDate,
            currentTime,
            weekRange
          );
        });
    alert("Successfully booked! Pls check your booking in Manage Bookings!");
    navigation.navigate("Home");
  };

  const updateConsultation = () => {
    CreateConsultFB.getWeekRange().then((weekRange) => {
      CreateConsultFB.updateBooking(
        userID,
        bookingId,
        moduleCode,
        date,
        startTime,
        endTime,
        location,
        finalisedConsultType,
        { id: userID, name: userName },
        participants,
        size,
        agenda,
        "Pending",
        currentDate,
        currentTime,
        weekRange
      );
    });

    alert("Successfully updated booking!");
    navigation.navigate("Home");
  };

  useEffect(() => {
    var loadedStudent = [];
    var getTutorialClass = CreateConsultFB.getTutorialClass(userID, moduleCode);
    getTutorialClass
      .then((tutorialClass) => CreateConsultFB.getTutorialClassStudent(tutorialClass, moduleCode))
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          loadedStudent.push({ id: data[i]["id"], name: data[i]["name"] });
        }
      });

    CreateConsultFB.checkUserName(userID).then((data) => {
      setUserName(data);
    });

    if (secondScreen === "Manage Bookings") {
      setParticipants(studentsInvolved);
      setSize(studentsInvolved.length);
      setConsultType("Private");
    } else {
      setStudentList(loadedStudent);
    }
  }, []);

  const locationJSX = (
    <View>
      <Text style={styles.itemName}>{"Location:"}</Text>
      <View style={styles.textInput}>
        <TextInput style={styles.textBox} underlineColorAndroid="transparent" onChangeText={(text) => setLocation(text)} value={location} />
        <TouchableOpacity style={styles.button}>
          <Image source={require("../assets/images/location.png")} style={styles.imageStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const typeJSX = (
    <View>
      <View style={styles.typeContainer}>
        {finalisedConsultType == null ? (
          <View>
            <Text style={styles.itemName}> Type:</Text>
            <RadioButton type={type} parentCallback={updateConsultType} />
          </View>
        ) : null}
      </View>
      {consultType === "Private" && studentsInvolved == null ? (
        <View>
          <Text style={styles.itemName}>{"Students involved:"}</Text>
          <View style={styles.textInput}>
            <TextInput style={styles.textBox} underlineColorAndroid="transparent" maxLength={20} numberofLines={5} editable={false} placeholder={"Select students"} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}
            >
              <Image source={require("../assets/images/student.png")} style={styles.imageStyle} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );

  const studentJSX = (
    <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
      <TouchableOpacity
        style={styles.modalBtn}
        onPress={() => {
          setModalVisible(!isModalVisible);
          setSize(selectedItems.length);
        }}
      >
        <Text style={styles.modalBtnText}>Return to Main screen</Text>
      </TouchableOpacity>

      <View style={styles.studentModalView}>
        <MultiSelect
          hideTags
          items={studentList}
          uniqueKey="id"
          ref={multiSelect}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Select students"
          searchInputPlaceholderText="Search Student..."
          onChangeInput={(text) => console.log(text)}
          altFontFamily="Righteous-Regular"
          selectedItemFontFamily="Righteous-Regular"
          fontFamily="Righteous-Regular"
          tagRemoveIconColor="#FFF"
          tagBorderColor="#FFF"
          tagTextColor="#FFF"
          selectedItemTextColor="#000"
          selectedItemIconColor="#000"
          itemTextColor="#000"
          displayKey="name"
          textColor="#000"
          searchInputStyle={{ color: "#000" }}
          hideSubmitButton={true}
          styleTextDropdown={styles.textDropdown}
          styleTextDropdownSelected={styles.textDropdownSelected}
        />
        <View>{multiSelect.current && multiSelect.current.getSelectedItemsExt(selectedItems)}</View>
      </View>
    </Modal>
  );

  const sizeJSX = (
    <View>
      <Text style={styles.itemName}> Size:</Text>
      <TextInput style={styles.sizeContainer} maxLength={3} keyboardType="numeric" onChangeText={(text) => setSize(text)} value={size} />
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.body} extraScrollHeight={extraScrollHeight} resetScrollToCoords={{ x: 0, y: 0 }}>
        <BreadCrumb navHistory={navHistory} />
        <ScrollView>
          <View style={styles.body}>
            <Text style={styles.title}> Fill in consultation details: </Text>
            <DateTime dateCallback={updateDate} startTimeCallback={updateStartTime} endTimeCallback={updateEndTime} />
            {locationJSX}
            {typeJSX}
            {consultType == "Public" ? sizeJSX : null}

            <Text style={styles.itemName}> Agenda: </Text>
            <View>
              <TextInput
                multiline={true}
                maxLength={200}
                numberofLines={5}
                style={styles.agendaBox}
                underlineColorAndroid="transparent"
                onFocus={() => setScrollHeight(200)}
                onChangeText={(text) => setAgenda(text)}
                value={agenda}
              />
            </View>
            <TouchableOpacity style={styles.createBtn} onPress={() => (secondScreen !== "Manage Bookings" ? createConsultation() : updateConsultation())}>
              <Text style={styles.createBtnText}>Create</Text>
            </TouchableOpacity>
          </View>
          {studentJSX}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: "#003D7C",
  },
  title: {
    marginTop: hp("1.8%"),
    fontSize: hp("3.5%"),
    textAlign: "center",
    fontFamily: "Righteous-Regular",
    color: "#FFFFFF",
    marginBottom: hp("2%"),
  },
  text: {
    color: "white",
    fontFamily: "Righteous-Regular",
  },
  textInput: {
    marginHorizontal: wp("25"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: hp("3.5%"),
    width: wp("50%"),
    borderRadius: 5,
    margin: hp("1%"),
  },
  textBox: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    fontSize: hp("2%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  itemName: {
    marginTop: hp("1%"),
    textAlign: "center",
    fontSize: hp("2%"),
    color: "white",
    alignItems: "center",
    height: hp("5%"),
    width: wp("100%"),
    fontFamily: "Righteous-Regular",
    marginBottom: hp("-3%"),
  },
  button: {
    height: hp("3.5%"),
    width: wp("10%"),
    borderRadius: hp("0.8%"),
    borderColor: "black",
    borderWidth: 1.1,
    alignItems: "center",
  },
  imageStyle: {
    height: hp("3%"),
    width: wp("7.5%"),
    resizeMode: "contain",
    alignItems: "center",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "#CFD8DC",
    flexDirection: "column",
    height: hp("36%"),
  },
  studentModalView: {
    backgroundColor: "#003D7C",
    flexDirection: "column",
    height: hp("36%"),
  },
  textDropdown: {
    marginLeft: wp("30%"),
  },
  textDropdownSelected: {
    marginLeft: wp("20%"),
    fontFamily: "Righteous-Regular",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: hp("3%"),
    fontFamily: "Righteous-Regular",
    marginBottom: "5%",
  },
  modalBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    height: hp("3.5%"),
    width: wp("45%"),
    justifyContent: "center",
    left: "25%",
    marginBottom: "3%",
  },
  modalBtnText: {
    textAlign: "center",
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
  },
  sizeContainer: {
    marginTop: hp("1.5%"),
    marginHorizontal: "42.5%",
    marginVertical: "1%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: wp("3.5%"),
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  agendaBox: {
    marginTop: hp("2%"),
    marginLeft: wp("15%"),
    borderColor: "black",
    fontSize: hp("2%"),
    marginBottom: "5%",
    height: hp("8.5%"),
    width: wp("68%"),
    backgroundColor: "#FFFFFF",
    borderRadius: hp("1.1%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
  },
  createBtn: {
    backgroundColor: "#FFFFFF",
    height: hp("3.5%"),
    width: wp("20%"),
    fontFamily: "Righteous-Regular",
    borderRadius: hp("1.1%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("40%"),
    flexDirection: "column",
    alignItems: "center",
  },
  createBtnText: {
    fontSize: hp("2%"),
    fontFamily: "Righteous-Regular",
    alignItems: "center",
    marginTop: wp("1%"),
  },
});

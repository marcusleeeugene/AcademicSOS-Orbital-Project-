<h1 align="center"> AcademicSOS - Developer Guide </h1>

  <ul>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/USERGUIDE.md#userGuide"> User Guide </a> - Step-by-step guide to learn about app functionality and usage </li>
    <li><a"> Developer Guide </a> - Developers guide and application architecture </li>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project#learningOutcomes"> Learning Outcomes </a></li>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project#aboutUs"> About Us </a></li>
  </ul>
  <br>
  <h2 id="developerGuide" align="center"> Developer Guide </h2>
  <ol>
     <li><a href="#settingUp"> Setting Up </a></li>
     <li>
       <a href="#design"> Design </a>
       <ul>
         <li> <a href="#architectureDesign"> Architecture </a> </li>
         <li> <a href="#databaseDesign"> Database </a> </li>
       </ul>
     </li>
     <li><a href="#implementation"> Implementation </a></li>
     <li><a href="#userTest"> User Test </a></li>
     <li><a href="#acknowledgement"> Acknowledgement </a></li>
  </ol>

  <h3 id="settingUp" align="center"> 1. Setting Up </h3>
    <p>
      Project was running on <a href="https://dev.to/expo/expo-sdk-38-is-now-available-5aa0"> Expo SDK 38: "~38.0.8"</a>. As such, remember to
      read the changelog for breaking changes and version compatibility for some libraries.
      <a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/package.json"> View project environment information </a>
    </p>
    <p>
      <b> The following are instructions to run the application locally: </b>
    </p>
    <ol>
      <li> Open the terminal and install with: <code> npm_install -g expo-cli </code> </li>
      <li> Clone AcademicSOS repo: <a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/"> AcademicSOS </a> </li>
      <li> Change directory into the AcademicSOS-RN directory: <code> cd AcademicSOS-RN </code> </li>
      <li> Install the following required library dependencies in the terminal: </li>
      <pre>
        <code>
          expo install react-native-responsive-screen
          expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
          expo install react-native-super-grid
          expo install react-native-modal
          expo install moment
          expo install react-native-keyboard-aware-scroll-view
          expo install firebase
          expo install react-native-app-auth
          expo install @react-navigation/native
          expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
          expo install @react-navigation/stack
          expo install react-native-multiple-select
          expo install react-native-custom-qr-codes-expo react-native-svg
          expo install expo-barcode-scanner
          expo install expo-permissions
          expo install react-native-webview
          expo install expo-notifications
          expo install expo-font @expo-google-fonts/inter
        </code>
      </pre>
      <li> Finally, run with: <code>expo start</code> Then, choose your preferred simulator and the application will run as shown below </li>
  <br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/DocImages/simulator.png"  height="500">
  </p>

  <h3 id="design" align="center"> 2. Design </h3>
  <h4 id="architectureDesign"> Architecture </h4>
    <p>
      This is our system architecture. The diagram below shows how our front-end and back-end are linked together by our application.
    </p>
    <br>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/DocImages/Architecture.png"  height="500">
    </p>
    <table align="center" style="width:100%">
      <tr>
        <th> Screen </th>
        <th> Elaboration </th>
      </tr>
      <tr>
        <td> Login </td>
        <td>
          <ol>
            <li> User will input his/her NUS login credentials. </li>
            <li> Firebase database authentication will determine account eligibility. </li>
            <li> On success, the user will be directed to the Home screen with relevant options available depending on their academic role. </li>
          </ol>
        </td>
      </tr>
      <tr>
        <td> Book Consultation </td>
        <td>
          <ol>
            <li> Only students will be allowed to perform book consult function. </li>
            <li> As a creator, the student will select the Teaching Assistant of the same tutorial class, fill in the necessary consultation details such as date, time, location, participants, agenda of consultation. </li>
            <li> Upon the booking of the consultation, the consultation details will be pushed into the database under the module branch and the user will be directed to the Manage Booking Screen. </li>
            <li> Initially, the consultation will be displayed on the students Manage Booking Screen. Students who are non-creator of the consultation will have to acknowledge the booking first before the consultation will be reflected on the Manage Booking screen of the chosen Teaching Assistant/Professors. </li>
          <ol>
        </td>
      </tr>
      <tr>
        <td> Create Consultation </td>
        <td>
          <ol>
            <li> Only Teaching Assistants/Professors will be allowed to perform the create consult function. </li>
            <li> As a creator, the user will fill in the necessary consultation details such as date, time, location, agenda of consultation and type of consultation. </li>
            <li> Upon the creation of the consultation, the consultation details will be pushed into the database under the module branch and the user will be directed to the Home Screen. </li>
            <li> Based on the consultation type in the database, public consultation will be displayed on the public consultation screen for all students taking the module. Private consultation bookings will be displayed on the Manage Booking Screen for all participants that will be involved in the consultation. </li>
          <ol>
        </td>
      </tr>
      <tr>
        <td> Attendance </td>
        <td>
          <ol>
            <li> User information will be retrieved from the database. </li>
            <li> On the TA side, upon clicking into the confirmed consultation in the  Manage Booking screen, the next screen will display the students involved, QR code for the consultation session and the attendance count. </li>
            <li> If a user is a student, the student will scan the QR code from the screen of the TA side as a form of acknowledgement that he/she is present for the consultation. </li>
            <li> The attendance status of the student will be updated and reflected under the same booking in the firebase database. </li>
            <li> On the TA side, the attendance count will be updated accordingly. </li>
          <ol>
        </td>
      </tr>
      <tr>
        <td> Manage Bookings </td>
        <td>
          <ol>
            <li> The user will be checked through a looping of the modules in the database and retrieve bookings only for which the user is involved in. </li>
            <li> The bookings retrieved will be displayed on the screen and sorted by date then time. </li>
            <li> For “Pending” consultation status, if the user is not the creator of the consultation, the user will have the choice to either accept or reject the consultation. Otherwise, cancellation of consultation is the only option available. </li>
            <li> Depending on the response of the user in (iii), the database will be updated accordingly. In the event the creator cancels the consultation, the whole booking will be removed from the database. </li>
            <li> For “Confirmed” consultation status, if the user is Teaching Assistant/Professor, the QR code will be generated and the size of the consultation will be displayed. Otherwise, the user will have the options to scan attendance or cancel booking. </li>
          <ol>
        </td>
      </tr>
      <tr>
        <td> Public Consultation </td>
        <td>
          <ol>
            <li> Only students will be allowed to use the public consultation screen. </li>
            <li> The database will check for whichever modules the student takes. </li>
            <li> The database will perform another retrieval of data of public consultations created by TAs and Professors of the modules that the student takes. </li>
            <li> The retrieved data will be displayed on the public consultation screen and sorted by date then time. </li>
            <li> The user will have the options to accept or reject the public consultation. </li>
            <li> If the user accepts the consultation, the consultation will be shifted to the Manage Booking screen and the corresponding public booking in the database will be updated by adding him/her as a participant. </li>
            <li> If the size of the public consultation is met, the consultation status will be updated to “Confirmed” within the booking in the database and will disappear from the public consultation screen. </li>
          <ol>
        </td>
      </tr>
    </table>
  <h4 id="databaseDesign"> Database </h4>
    <p>
      We decided to use Firebase real-time database as it is easy to set up and it has been so popular recently. It allows for quick
      exchanging of data to and from the database.
    </p>
    <p>
      Since Firebase real-time database is stored as JSON Objects, data added will be stored as nodes under each branch of the tree.
      As such, we had to design our database in such a way that we do not have to retrieve the entire main branch of the database just
      to retrieve a single data. We organised our database into multiple sub branches.
    </p>
    <p>
      Throughout the design process, we also kept in mind that the database should allow for fast and efficient retrieval of data, and
      be able to dynamically handle possible future data additions.
    </p>
    <p>
      Below is the overall structure of our database. The “modules” and “users” have been segregated into separate branches. This will
      allow the user details to be easily differentiated from their consultation details. This way, authentication can be checked quickly
      and easily from the “users” branch as there is less nested data within the branch.
    </p>
    <br>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/DocImages/FBOverView.png"  height="400">
    </p>
    <p>
      As shown below, under the “users” branch, it is further categorised into “professors” and “students” branches while for each individual
      user branch consists of the modules and its tutorial class that the user is involved in.
    </p>
    <br>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/DocImages/FBUserOverView.png"  height="500">
    </p>
    <p>
      As shown below, the module branch consists of the modules available in the semester. And each module will have a sub branch “bookings”
      which stores a unique booking id and its consultation details. In the participants field, the participants are stored as an array since
      there can be many participants involved in a consultation. The array also allows us for easy retrieval of participant information when
      looping through the participants JSON object.
    </p>
    <br>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS-RN/Docs/DocImages/FBModOverView.png"  height="600">
    </p>

  <h3 id="implementation" align="center"> 3. Implementation </h3>

  <h3 id="userTest" align="center"> 4. User Test </h3>

  <h3 id="acknowledgement" align="center"> 5. Acknowledgement </h3>
    <p>
      <b> The following are the list of libraries we used in our application: </b>
    </p>
    <ul>
      <li><a href="https://api.nusmods.com/v2/"> NUSMods: NUSMods Api </a></li>
      <li><a href="https://github.com/marudy/react-native-responsive-screen"> Marudy: react-native-responsive-screen </a></li>
      <li><a href="https://github.com/mmazzarolo/react-native-modal-datetime-picker"> Mmazzarolo: react-native-modal-datetime-picker </a></li>
      <li><a href="https://github.com/saleel/react-native-super-grid/"> Saleel: react-native-super-grid </a></li>
      <li><a href="https://momentjs.com/docs/"> MomentJs: moment date time format </a></li>
      <li><a href="https://github.com/APSL/react-native-keyboard-aware-scroll-view"> APSL: react-native-keyboard-aware-scroll-view </a></li>
      <li><a href="https://reactnavigation.org/docs/getting-started"> React-Native: react-navigation </a></li>
      <li><a href="https://github.com/react-native-community/react-native-modal"> React-Native: react-native-modal </a></li>
      <li><a href="https://github.com/toystars/react-native-multiple-select"> Toystars: react-native-multiple-select </a></li>
      <li><a href="https://github.com/eddyoc/react-native-custom-qr-codes-expo"> Eddyoc: react-native-custom-qr-codes-expo </a></li>
      <li><a href="https://docs.expo.io/versions/latest/sdk/bar-code-scanner/"> Expo: bar-code-scanner </a></li>
      <li><a href="https://docs.expo.io/versions/latest/sdk/permissions/"> Expo: permissions </a></li>
      <li><a href="https://docs.expo.io/versions/latest/sdk/notifications/"> Expo: notifications </a></li>
      <li><a href="https://firebase.google.com/docs/database"> Google: Firebase Real-time Database </a></li>
    </ul>

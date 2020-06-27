<h1 align="center"> AcademicSOS - Developer Guide </h1>

  <ul>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/USERGUIDE.md"> User Guide </a> - Step-by-step guide to learn about app functionality and usage </li>
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
      <b> The following are instructions to run the application locally: </b>
    </p>
    <ol>
      <li> Open the terminal and install with: <code> npm_install -g expo-cli </code> </li>
      <li> Clone AcademicSOS repo: <a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/"> AcademicSOS </a> </li>
      <li> Change directory into the AcademicSOS-RN directory: <code> cd AcademicSOS-RN </code> </li>
      <li> Install the following required library dependencies in the terminal: </li>
      <pre>
        <code>
          npm install react-native-responsive-screen --save
          npm i react-native-modal-datetime-picker @react-native-community/datetimepicker
          npm install react-native-super-grid
          npm i react-native-modal
          npm install moment
          npm i react-native-keyboard-aware-scroll-view --save
          expo install firebase
          npm install react-native-app-auth
          npm install @react-navigation/native
          npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
          npm install @react-navigation/stack
          npm install react-native-multiple-select --save
          expo install react-native-custom-qr-codes-expo
          expo install expo-barcode-scanner
          expo install expo-permissions
          expo install react-native-webview
        </code>
      </pre>
      <li> Finally, run with: <code> expo start </code> Then, choose your preferred simulator and the application will run as shown below </li>
  <br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/simulator.png"  height="500">
  </p>

  <h3 id="design" align="center"> 2. Design </h3>
  <h4 id="architectureDesign"> Architecture </h4>
  <h4 id="databaseDesign"> Database </h4>
    <p>
      Since Firebase Real-time database is stored as JSON Objects, data added will be stored as nodes under each branch of the tree.
    </p>
    <p>
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
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/FBOverView.png"  height="400">
    </p>
    <p>
      As shown below, under the “users” branch, it is further categorised into “professors” and “students” branches while for each individual
      user branch consists of the modules and its tutorial class that the user is involved in.
    </p>
    <br>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/FBUserOverView.png"  height="400">
    </p>
    <p>
      As shown below, the module branch consists of the modules available in the semester. And each module will have a sub branch “bookings”
      which stores a unique booking id and its consultation details. In the participants field, the participants are stored as an array since
      there can be many participants involved in a consultation. The array also allows us for easy retrieval of participant information when
      looping through the participants JSON object.
    </p>
    <p align="center">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/FBModOverView.png"  height="600">
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
      <li><a href="https://firebase.google.com/docs/database"> Google: Firebase Real-time Database </a></li>
    </ul>

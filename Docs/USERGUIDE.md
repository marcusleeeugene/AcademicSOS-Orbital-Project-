<h1 align="center"> AcademicSOS - User Guide </h1>

 <ul>
    <li><a> User Guide </a> - Step-by-step guide to learn about app functionality and usage </li>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DEVELOPERGUIDE.md"> Developer Guide </a> - Developers guide and application architecture </li>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project#learningOutcomes"> Learning Outcomes </a></li>
    <li><a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project#aboutUs"> About Us </a></li>
 </ul>
 <br>
   <h2 id="userGuide" align="center"> User Guide </h2>
   <ol>
      <li><a href="#introduction"> Introduction </a></li>
      <li><a href="#userFlow"> User Flow </a></li>
      <li>
         <a href="#features"> Features </a>
         <ol>
            <li><a href="#loginFeature"> Login </a></li>
            <li><a href="#bookConsultFeature"> Book a consultation </a></li>
            <li><a href="#createConsultFeature"> Create a consultation </a></li>
            <li><a href="#manageBookingsFeature"> Manage Bookings </a></li>
            <li><a href="#publicConsultFeature"> Public Consultation </a></li>
            <li><a href="#priorityFeature"> Priority Points System </a></li>
            <li><a href="#attendanceFeature"> Attendance Scanning with QR Code </a></li>
            <li><a href="#notificationFeature"> Notification Reminder </a></li>
         </ol>
      </li>
      <li><a href="#installation">  Installation of AcademicSOS  </a></li>
   </ol>

<h3 id="introduction" align="center"> 1. Introduction </h3>
   <p>
      AcademicSOS is a cross-platform mobile application that allows NUS students, professors and teaching assistants to easily book, create and keep track of consultations.
   </p>
   <p>
      The application allows all consultation matters to be done solely on the application, without requiring the need to email or message professors and teaching assistants. This will help in reducing email spams to professors’s inboxes and also increase the monitoring rate.
   </p>
   <br>
   <p align="center">
     <a href="https://youtu.be/ry4Z9ZYL8DY">
       <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/AcademicSOS_VideoGuide.jpg"  height="300">
     </a>
   </p>

<h3 id="userFlow" align="center"> 2. User Flow </h3>
   <p>
      Depending on the user access, each user will have different sets of options available to them.
   </p>
   <br>
   <p align="center">
      <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/Student.png"  height="300">
      <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/Teaching Assistant.png"  height="300">
      <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/Professors.png"  height="300">
   </p>

<h3 id="features" align="center"> 3. Features </h3>
<h4 id="loginFeature"> 3i. Login </h4>
  <p>
    Users just have to login using their NUS account using their NUSNETID and password and firebase authentication will check for account legitimacy before logging in. For the project, due to delays in getting approval for the LumiNUS API, we decided to manually create our users.
  </p>
  <p><b> The following are available users for this application: </b></p>
  <p>
    (Professor Martin Henz, CS1101S TA)
    <br>
    Id: p0123456
    <br>
    Pw: password
  </p>
  <p>
    (Marcus Lee Eugene, Student for certain mods & TA of MA1101R)
    <br>
    Id: e0415870
    <br>
    Pw: password
  </p>
  <p>
    (Tay Kai Xiang, Student for certain mods & TA of CS1231S)
    <br>
    Id: e0407217
    <br>
    Pw: password
  </p>
  <p>
    (Mike Tan, Student for all modules being taken by him)
    <br>
    Id: e0123456
    <br>
    Pw: password
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/Login%20Video.gif"  height="500">
  </p>

<h4 id="bookConsultFeature"> 3ii. Book a consultation </h4>
  <p>
    Students of a module can book a consultation only to their respective TAs from their tutorial group or Professors.
    Students are allowed to pick the TA from their tutorial slot, selecting the intended booking date and time, indicating the location in
    the textbox (virtual meeting place like Zoom or physical location) as well as the people involved in the consultation.
  </p>
  <p>
    If the user prefers one-to-one consultation with the Teaching Assistant/Professor, it is not required to fill in the students involved section.
    With a dynamic search function, it allows the user to add fellow peers who are taking the same module to join in as group consultation.
    Before the submission of the consultation slot, there is the flexibility for the student to add or remove students participants.
  </p>
  <p>
    In the agenda textbox, students are encouraged to put in the topic or scope of the problem for discussion which allows Professors or TAs to
    better prepare beforehand. It is also possible to attach a Google Slides link with screenshots of the questions that the students want to ask in
    the textbox too.
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/BookConsult%20Video.gif"  height="500">
  </p>

<h4 id="createConsultFeature"> 3iii. Create a consultation </h4>
  <p>
    Professors/Teaching Assistants (TAs) of a module can create a consultation slot to meet students in their respective tutorial group in the
    event that there is a need for project review and feedback for certain students for instance.
  </p>
  <p>
    Similarly, it is recommended to create the consultation slot minimally one week in advance, selecting the intended booking date and time,
    indicating the location in the textbox (virtual meeting place like Zoom or physical location) as well as the people involved in the consultation.
  </p>
  <p>
    With a dynamic search function, it allows the user to add students in the same tutorial class to join in as group or individual one-to-one consultation.
    In the agenda textbox, it is recommended to fill in the purpose of the meeting so that the students will know beforehand.
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/CreateConsult%20Video.gif"  height="500">
  </p>

<h4 id="manageBookingsFeature"> 3iv. Manage Bookings </h4>
  <p>
    Manage bookings are made available to all users to allow them to look at their consultations that are pending or approved. In this screen,
    the user can filter by Status (pending or confirmed), academic week and day. The consultations are all sorted in ascending order by date then by time.
  </p>
  <p>
    By clicking into a consultation, it will bring the user to the next page which shows into detail all the information of the selected consultation
    including the students involved in the consultation. Depending on the user role in the module, whoever is the creator of the consultation slot,
    actions allowed to be performed will vary for each individual.
  </p>
  <p>
    With book consult function, a student (creator of consultation slot) creates a private consultation slot where fellow friends who are taking the
    same module can be added into the consultation easily. Upon the creation of the consultation, the consultation slot will be displayed on the Manage
    Bookings section for the users involved.
  </p>
  <p>
    <b>
      Do note that the consultation slot will only appear on the TA’s Manage Bookings section after all the other student participants have accepted/
      rejected the consultation slot.
    </b>
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/ManageBooking%20Video.gif"  height="500">
  </p>
  <p>
    Below is an illustration of the various actions/scenarios that can happen when different buttons are clicked inside the consultation slot of Manage
    Bookings by different groups of users.
  </p>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/Book%20Consult%20Logic.png"  height="300">
  </p>

<h4 id="publicConsultFeature"> 3v. Public Consultation </h4>
  <p>
    With the create consult function, a teaching assistant (creator of consultation slot) has the option to create a public consultation slot
    depending on his/her availability and indicating the size of the consultation. Upon the creation of the public consultation, the consultation
    slot will be shown on the public consultation details screen for all students taking the module.
  </p>
  <p>
    <b>
      Do note that the public consultation slot will disappear from the student screen after the student accepted or rejected the consultation.
      If the student accepted the consultation, the consultation slot will be moved to Manage Bookings automatically. Once the number of students
      who accepted the public consultation slot matches the size of the consult, the consultation status will automatically be changed to confirmed and
      reflected on the Manage Booking screen for all the users involved. If the size of the public consult slot is not met, the TA has the right to
      start the consultation.
    </b>
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/PublicConsult%20Video.gif"  height="500">
  </p>
  <p>
    Alternatively, the teaching assistant can create a private consultation slot where students from the same tutorial group can be added into the
    consultation easily. Upon the creation of the private consultation, the consultation slot will be shown on the Manage Bookings section for the
    users involved.
  </p>
  <p>
    <b>
      Do note that the consultation slot will only appear on the TA’s Manage Bookings section after all the other student participants have
      accepted/rejected the consultation slot.
    </b>
  </p>
  <p>
    Below is an illustration of the various actions/scenarios that can happen when different buttons are clicked inside public consultation
    and manage bookings.
  <p>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocImages/CreateConsult%20Logic.png"  height="300">
  </p>

<h4 id="priorityFeature"> 3vi. Priority Points System (To be completed) </h4>
  <p>
  Priority points get deducted if the student does not turn up for an approved consultation on the day itself. This will affect their future
  consultation requests and will rank their request at the bottom when showing up in the pending section of their TA’s Manage Booking screen,
  in the case where another student has booked the consultation on the same date and time.
  </p>

<h4 id="attendanceFeature"> 3vii. Attendance Scanning with QR Code </h4>
  <p>
    If the user is a student, in the Manage Booking screen, when the user clicks into the consultation during the consultation slot
    and select the scan attendance on option, the camera application will be opened to scan for the correct QR code displayed on the Manage
    Booking screen of the TA/Professor.
  </p>
  <p>
    On the TA/Professor side, when they click into the consultation slot, it generates a unique QR code attendance for their students to
    scan based on the booking ID.
  </p>
  <br><br>
  <p align="center">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/QRCodeTA%20Video.gif"  height="500">
     <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DocVideos/QRCodeStudent%20Video.gif"  height="500">
  </p>

<h4 id="notificationFeature"> 3viii. Notification Reminder (To be completed) </h4>
  <p>
    Closer to the day of the consultation, a notification will be sent out to notify users of their upcoming consultations.
  </p>

<h4 id="installation"> 4. Installation of AcademicSOS </h4>
  <p>
    <b> For Android Users: </b>
    <a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/AcademicSOS.apk"> Download .apk file</a>
  </p>
  <p>
    <b> For ios Users: </b>
    Unfortunately, a paid developer account is required. Install the app by cloning the repo following the steps
    <a href="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Docs/DEVELOPERGUIDE.md/#settingUp"> here </a>.
  </p>

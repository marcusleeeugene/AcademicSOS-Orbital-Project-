# AcademicSOS React Native Mobile Application (Orbital)

AcademicSOS is a cross-platform mobile application that allows NUS students, professors and teaching assistants to easily book, create and keep track of consultations. 

The application allows all consultation matters to be done solely on the application, without requiring the need to email or message professors and teaching assistants. This will help in reducing email spams to professors’s inboxes and also increase the monitoring rate.

<p align="center">
   <img src="https://github.com/marcusleeeugene/AcademicSOS-Orbital-Project/blob/master/Poster/AcademicSOS-V2.0.png"  height="500">
</p>

### Site Map
* [User Guide] - Step-by-step guide to learn about app functionality and usage
* [Developer Guide] - Developers guide and application architecture
* [Learning Outcomes]
* [About Us]
* [Contact Us]

### Acknowledgements
[User Guide]: <http://daringfireball.net>
[Developer Guide]:  <http://daringfireball.net>
[Learning Outcomes]:  <http://daringfireball.net>
[About Us]:  <http://daringfireball.net>
[Contact Us]:  <http://daringfireball.net>

### Content
1. Introduction
2. User Flow
3. Features
   - 3.1. Login
   - 3.2. Book a consultation
   - 3.3. Create a consultation
   - 3.4. Manage Bookings
   - 3.5. Public Consultation 
   - 3.6. Priority Points System
   - 3.7. Attendance Scanning with QR Code
   - 3.8. Notification Reminder
4. Installation of AcademicSOS
5. Using AcademicSOS

### 1. Introduction
AcademicSOS is a cross-platform mobile application that allows NUS students, professors and teaching assistants to easily book, create and keep track of consultations. 

The application allows all consultation matters to be done solely on the application, without requiring the need to email or message professors and teaching assistants. This will help in reducing email spams to professors’s inboxes and also increase the monitoring rate.

### 2. User Flow
Depending on the user access, each user will have different sets of options available to them.


### 3. Features
#### 3.1 Login
Users just have to login using their NUS account using their NETID and password and firebase authentication will check for account legitimacy before logging in. For the project, due to delays in getting approval for the LumiNUS API, we decided to manually create our users. 


The following are available users for this application:
(Professor Martin Henz, CS1101S TA)
Id: p0123456
Pw: password

(Marcus Lee Eugene, Student for certain mods & TA of MA1101R)
Id: e0415870	
Pw: password

(Tay Kai Xiang, Student for certain mods & TA of CS1231S)
Id: e0407217	
Pw: password

(Mike Tan, Student for all modules being taken by him)
Id: e0123456
Pw: password


#### 3.2 Book a consultation
Students of a module can book a consultation only to their respective TAs from their tutorial group or Professors. Students are allowed to only book minimally one week in advance, selecting the intended booking date and time, indicating the location in the textbox (virtual meeting place like Zoom or physical location) as well as the people involved in the consultation. If the user prefers one-to-one consultation with the Teaching Assistant/Professor, it is not required to fill in the students involved section. With a dynamic search function, it allows the user to add fellow peers who are taking the same module to join in as group consultation. In the remarks textbox, students are encouraged to put in the topic or scope of the problem for discussion which allows Professors or TAs to better prepare beforehand.

<INSERT BOOK CONSULTATION IMG/ Video>

#### 3.3 Create a consultation
Professors/Teaching Assistants (TAs) of a module can create a consultation slot to meet students in their respective tutorial group in the event that there is a need for project review and feedback for certain students for instance. Similarly, it is recommended to create the consultation slot minimally one week in advance, selecting the intended booking date and time, indicating the location in the textbox (virtual meeting place like Zoom or physical location) as well as the people involved in the consultation. With a dynamic search function, it allows the user to add students in the same tutorial class to join in as group or individual one-to-one consultation. In the remarks textbox, it is recommended to fill in the agenda of the meeting so that the students will know the purpose of the meeting.

<INSERT CREATE CONSULTATION IMG>




#### 3.4 Manage Bookings
Manage bookings are made available to all users to allow them to look at their consultations that are pending or approved. In this screen, the user can filter by Status (pending or confirmed), academic week and day. The consultations are all sorted in ascending order by date then by time.

<INSERT MANAGE BOOKINGS GIF>

By clicking into a consultation, it will bring the user to the next page which shows into detail all the information of the selected consultation including the students involved in the consultation. Depending on the user role in the module, whoever is the creator of the consultation slot, actions allowed to be performed will vary for each individual. 

With book consult function, a student (creator of consultation slot) creates a private consultation slot where fellow friends who are taking the same module can be added into the consultation easily. Upon the creation of the consultation, the consultation slot will be shown on the Manage Bookings section for the users involved. 
Do note that the consultation slot will only appear on the TA’s Manage Bookings section after all the other student participants have accepted/rejected the consultation slot.

Below is an illustration of the various actions/scenarios that can happen when different buttons are clicked inside the consultation slot of Manage Bookings by different groups of users.



<INSERT MANAGE BOOKINGS IMG>






#### 3.5 Public consultation 
<INSERT PUBLIC CONSULTATION IMG>

With the create consult function, a teaching assistant (creator of consultation slot) has the option to create a public consultation slot depending on their availability and indicating the size of the consultation. Upon the creation of the public consultation, the consultation slot will be shown on the public consultation details screen for all students taking the module.

**Do note that the public consultation slot will disappear from the student screen after the student accepted or rejected the consultation. If the student accepted the consultation, the consultation slot will be moved to Manage Bookings automatically. Once the number of students who accepted the public consultation slot matches the size of the consult, the consultation status will automatically be changed to confirmed and reflected on the Manage Booking screen for all the users involved. If the size of the public consult slot is not met, the TA has the right to start the consultation.**

Alternatively, the teaching assistant can create a private consultation slot where students from the same tutorial group can be added into the consultation easily. Upon the creation of the private consultation, the consultation slot will be shown on the Manage Bookings section for the users involved. 

**Do note that the consultation slot will only appear on the TA’s Manage Bookings section after all the other student participants have accepted/rejected the consultation slot.**

Below is an illustration of the various actions/scenarios that can happen when different buttons are clicked inside public consultation and manage bookings.




#### 3.6 Priority Points System
Priority points get deducted if the student does not turn up for an approved consultation on the day itself. This will affect their future consultation requests and will rank their request at the bottom when showing up in the pending section of their TA’s Manage Booking screen, in the case where another student has booked the consultation on the same date and time.
<INSERT PRIORITY POINTS IMG>

#### 3.7 Attendance Scanning with QR Code
If the user is a student, in the manage booking screen, when the user clicks into the consultation during the consultation slot, their screen will open the camera application to scan for a QR provided by the TA/Professor.

On the TA/Professor side, when they click into the consultation slot, it generates a QR code attendance for their students to scan.
<INSERT ATTENDANCE IMG>

#### 3.8 Notification Reminder
Closer to the day of the consultation, a notification will be sent out to notify users of their upcoming consultations.
<INSERT NOTIFICATION IMG>

### 4. Installation of AcademicSOS

# College App for its Activities and Notifications
Name: Pradip Kandel

CollegeID: 160383

Coventry ID: 9638512

Batch: Jan19D

Brief description of the domain of your project!

-> The College Application for its Activities and Notifications is a web based application aimed at supporting college (teachers and students) share resources easily with the use of technology. The resources may be anything that is needed to be shared to students such as college notices, events, seminars, courses, modules and their contents, assignments, important dates and so on. The project has two parts in it. Backend of this project is developed using node js (express framework) and mongodb database is used for storing data while front end has been developed using HTML, CSS and jQuery. The front end code is available here https://github.com/stw304cem/t3-frontend-web-pradipkandel008.git .

## List of Main Features
List out 3/4 main technical features of your project

1. This application has the feature of student registration and login so that students can access college resources only when they are logged in.
2. Students can view the modules that they are currently assocaited with and can view all the module contents.
3. Students can view the assignments published by teachers and submit assignment. Assignment can only be submitted if deadline is not exceeded. If deadline exceeds, students can submit their assignments. Also, students can delete and edit their submitted assignment as per as their choice.
4. Studets can view the various notices published by college such as holiday notice, exam notice, event notice and many other notice.
5. Students can view various courses offered by colleges and enquire about those courses, and also they can give their opinion (feedback) about the college.
6. Admins of the application can view all the details about the application such as users, assignments, notices, submissions, feedbacks and so on. Also, admins are responsible for posting notices, assignments, courses, modules and module contents.

## API Documentation
List out your main APIs and its sample input and output!

1. Assignment API
There are multiple API's for assignment purpose. For example, admin can post assignments, delete them and update them.
#samples -->
#router.post("/", auth, upload.single("assignment_file"), (req, res) => {....});
#router.get("/", function(req, res) {  Assignment.find({}).then().catch()  });
#router.get("/:id", function(req, res) {  Assignment.findById({_id:req.params.id}).then().catch()  });
#router.delete("/deleteAssignment/:id", auth, (req, res) => {assignment.delete().then().catch()});
#router.put("/updateAssignment/:id",auth,upload.single("assignment_file"), function(req, res) {
    Assignment.update({ _id: id },{$set: { ..... }}).then().catch()});

Just like these samples of routes, all other routes are defined.

2. Submission API
Once the assignment has been published, students can submit assignments until the deadline exceeds. They can also edit or delete their submissions.

3. Registration and Login API
User can register with their details and can login to the application in order to access the resources provided by the application. Also, they can update their profile details, enquire about courses, post feedbacks once they are logged in. 

4. Courses and Modules API 
Admins can post differnt courses and their details, update them and delete them. Also they can add different modules and their content so that students can view and download the content. 



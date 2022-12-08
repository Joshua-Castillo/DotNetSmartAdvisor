import React from "react";

let handleEmailFlag1,
  handleEmailFlag2,
  handleEmailFlag3,
  handleEmailFlag4 = false;
let studentEmail = "";
let advisorEmail = "";
let question = "";
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    message = message.toLowerCase();
    if (message.includes("hello")) {
      actions.handleHello();
    } else if (message.includes("dog")) {
      actions.handleDog();
      // } else if (message.includes("email")) {
      //   actions.handleEmail(
      //     "coen424gr11@outlook.com",
      //     "studentemail.fake@gmail.com",
      //     "A student has a question for you!",
      //     "Last question asked"
      //   );
    } else if (message.includes("fac")) {
      actions.handleFacultyCatalog();
    } else if (message.includes("prerequisite") | message.includes("before")) {
      actions.handleCourseCatalog(message);
    } else if (message.includes("session")) {
      actions.handleSessions(message);
    } else if (message.includes("enrol me")) {
      //CONTACT ADVISOR
      actions.handleContactAdvisor(message);
      handleEmailFlag1 = true;
    } else if (handleEmailFlag1) {
      //QUESTION
      handleEmailFlag1 = false;
      actions.handleInputPhrase(message);
      studentEmail = message;

      handleEmailFlag2 = true;
    } else if (handleEmailFlag2) {
      //ADVISOR EMAIL
      handleEmailFlag2 = false;
      //actions.handleRecipients(message);
      question = message + " Please respond to " + studentEmail;
      advisorEmail = "coen424gr11@outlook.com";
      console.log("advisor email ", advisorEmail);
      console.log("student email ", studentEmail);
      console.log("question ", question);
      actions.handleEmail(
        advisorEmail,
        studentEmail,
        "A student has a question for you!",
        question
      );
      handleEmailFlag3 = true;
    } else {
      actions.handleQuestion(message);
      //console.log("in else");
    }
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;

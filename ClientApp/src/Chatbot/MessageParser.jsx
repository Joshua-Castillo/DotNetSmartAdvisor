import React from "react";

let handleEmailFlag1,
  handleEmailFlag2,
  handleEmailFlag3,
  handleEmailFlag4,
  handleEmailFlag5 = false;

let studentEmail = "";
let advisorEmail = "";
let question = "";
let subject = "";
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    message = message.toLowerCase();
    if (message.includes("hello")) {
      actions.handleHello();
    } else if (message.includes("dog")) {
      actions.handleDog();
    } else if (message.includes("fac")) {
      actions.handleFacultyCatalog();
    } else if (message.includes("prerequisite") | message.includes("before")) {
      actions.handleCourseCatalog(message);
    } else if (message.includes("session")) {
      actions.handleSessions(message);
    } else if (message.includes("enroll me") | message.includes("enrol me")) {
      //CONTACT ADVISOR
      actions.handleContactAdvisor();
      handleEmailFlag1 = true;
    } else if (handleEmailFlag1) {
      //QUESTION
      handleEmailFlag1 = false;
      actions.handleInputPhrase(message);
      studentEmail = message;
      handleEmailFlag2 = true;
    } else if (handleEmailFlag2) {
      //SUBJECT
      handleEmailFlag2 = false;
      actions.handleInputSubject(message);
      question = message + " Please respond to " + studentEmail;
      handleEmailFlag3 = true;
    } else if (handleEmailFlag3) {
      //INPUT MAJOR
      handleEmailFlag3 = false;
      actions.handleRecipients(message);
      subject = message;
      handleEmailFlag4 = true;
    } else if (handleEmailFlag4) {
      //PROVIDE ADVISOR EMAIL
      handleEmailFlag4 = false;
      actions.parseRecipients(message);
      console.log("message ", message);

      handleEmailFlag5 = true;
    } else if (handleEmailFlag5) {
      handleEmailFlag5 = false;
      //SEND EMAIL
      if (message.includes("@")) {
        advisorEmail = message;

        console.log("message2 ", message);
        console.log("advisor email ", advisorEmail);
        console.log("student email ", studentEmail);
        console.log("question ", question);
        console.log("subject ", subject);
        actions.handleEmail(advisorEmail, studentEmail, subject, question);
        actions.handleSentMessage();
      } else actions.handleNotSent();
    } else {
      actions.handleQuestion(message);
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

import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    message = message.toLowerCase();
    if (message.includes("hello")) {
      actions.handleHello();
    } else if (message.includes("dog")) {
      actions.handleDog();
    } else if (message.includes("email")) {
      actions.handleEmail(
        "coen424gr11@outlook.com",
        "studentemail.fake@gmail.com",
        "A student has a question for you!",
        "Last question asked"
      );
    } else if (message.includes("fac")) {
      actions.handleFacultyCatalog();
    } else if (message.includes("prerequisite") | message.includes("before")) {
      actions.handleCourseCatalog(message);
    } else if (message.includes("session")) {
      actions.handleSessions(message);
    } else if (message.includes("enroll me")) {
      actions.handleContactAdvisor();
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

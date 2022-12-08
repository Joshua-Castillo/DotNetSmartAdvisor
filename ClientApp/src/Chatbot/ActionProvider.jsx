import React from "react";
import ConcordiaLinkImg from "../photos/concordiaLink.png";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    async function fetchData() {
      const response = await fetch(
        `https://localhost:7050/api/QuestionAnswering`,
        { method: "GET" }
      ).then((response) => response.json());
      console.log(response);
      return response;
    }

    fetchData();
    const botMessage = createChatBotMessage("hello back to you");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleQuestion = async (question) => {
    let response = await fetch(
      `https://localhost:7050/api/QuestionAnswering/question/${question}`,
      { method: "POST" },
    );
    response = await response.json();

    let answer = response.Value.Answers[0].Answer;

    console.log(answer);
    let botMessage;
    console.log(answer.substring(0, 4));
    if (answer.substring(0, 4) === "http") {
      botMessage = createChatBotMessage(
        <a href={answer}>
          <img width="150px" src={ConcordiaLinkImg} alt="" />
        </a>
      );
    } else {
      botMessage = createChatBotMessage(<p>{answer}</p>);
    }
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleEmail = (advisorEmail, studentEmail, subject, question) => {
    fetch(
      `https://localhost:7050/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`
    );
  };

  // const handleRecipients = () => {};

  const handleFacultyCatalog = async () => {
    let response = await fetch(
      `https://localhost:7050/api/Cosmos`,
      {
        method: "GET",
      }
    );
    response = await response.json();

    console.log(response[0]);

    let botMessage = createChatBotMessage("get em");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSessions = async (message) => {
    let response = await fetch(
      `https://localhost:7050/api/Cosmos`,
      { method: "GET" }
    );
    response = await response.json();
    console.log(response[1]);
    let botMessage = createChatBotMessage("get em");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const answer1 = () => {
    let botquestion = createChatBotMessage("Please enter your email");
    console.log(botquestion);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botquestion],
    }));
  };
  const answer2 = () => {
    let botMessage = createChatBotMessage("Please enter your Major");
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleCourseCatalog = async (message) => {
    let response = await fetch(`${window.location}/api/Cosmos`, {
      method: "GET",
    });
    response = await response.json();
    console.log("1", message);
    message = message.replace(/\s/g, "").toUpperCase();
    console.log("2", message);
    let subjectToSearch;
    let catalogToSearch;


    switch (true) {
      case message.includes("BEFORE") && message.includes("TAKING"):
        subjectToSearch = message.substring(
          message.indexOf("TAKING") + 6,
          message.indexOf("TAKING") + 10
        );
        catalogToSearch = message.substring(
          message.indexOf("TAKING") + 10,
          message.indexOf("TAKING") + 13
        );
        break;
      case message.includes("BEFORE"):
        subjectToSearch = message.substring(
          message.indexOf("BEFORE") + 6,
          message.indexOf("BEFORE") + 10
        );
        catalogToSearch = message.substring(
          message.indexOf("BEFORE") + 10,
          message.indexOf("BEFORE") + 15
        );
        break;
      case message.includes("FOR"):
        subjectToSearch = message.substring(
          message.indexOf("FOR") + 3,
          message.indexOf("FOR") + 7
        );
        catalogToSearch = message.substring(
          message.indexOf("FOR") + 7,
          message.indexOf("FOR") + 12
        );
        break;
      default:
        break;
    }
    console.log(catalogToSearch);
    console.log(subjectToSearch);

    
    let botMessage = createChatBotMessage(
      response[2].data.courseCatalogData.filter(
        (record) =>
          record.subject === subjectToSearch &&
          record.catalog === catalogToSearch
      )[0].preRequisiteDescription
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  
  const handleContactAdvisor = async () => {
    answer2();
    let advisorEmail = "coen424gr11@outlook.com";

    answer1();
    let studentEmail = "studentemail.fake@gmail.com";

    let subject = "A student has a question for you!";

    let question =
      "I am waitlisted for a course. Can you please enroll me in this class. \n" +
      "Please responde to email : " +
      "\n" +
      studentEmail;

    let response = await fetch(
      `https://localhost:7050/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`,
    );
    response = await response.json();

    console.log("answer:  ", response.Value.Answers[0].Answer);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleQuestion,
            handleFacultyCatalog,
            handleCourseCatalog,
            handleSessions,
            handleEmail,
            handleContactAdvisor,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

import React from "react";
import ConcordiaLinkImg from "../photos/concordiaLink.png";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    async function fetchData() {
      const response = await fetch(
        `https://${window.location.hostname}/api/QuestionAnswering`,
        { method: "GET" }
      ).then((response) => response.json());
      console.log(response);
      return response;
    }
    fetchData();
    const botMessage = createChatBotMessage("NOICE");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleQuestion = async (insertQuestion) => {
    let response = await fetch(
      //`https://smartadvisorapi.azure-api.net/api/QuestionAnswering/question/${insertQuestion}`,
      `https://${window.location.hostname}/api/QuestionAnswering/${insertQuestion}`,
      { method: "POST" }
    );
    response = await response.json();

    let answer = response.Value.Answers[0].Answer;
    // console.log(answer)

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

  //

  const handleFacultyCatalog = async () => {
    let response = await fetch(
      `https://${window.location.hostname}/api/Cosmos`,
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
    console.log(`https://${window.location.hostname}/api/Cosmos`);
    let response = await fetch(
      `https://${window.location.hostname}/api/Cosmos`,
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

  const handleCourseCatalog = async (message) => {
    let response = await fetch(
      `https://${window.location.hostname}/api/Cosmos`,
      {
        method: "GET",
      }
    );
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

  const handleEmail = (advisorEmail, studentEmail, subject, question) => {
    fetch(
      `https://${window.location.hostname}/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`,
      {
        method: "POST",
      }
    );
  };

  const answer1 = (response) => {
    let botquestion = createChatBotMessage(
      "I can't do that, we'll have to send an email to your advisor! Please enter your email: "
    );
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
  const answer3 = () => {
    let botMessage = createChatBotMessage(
      "Please detail your question below : "
    );
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // const saveMessages = (messages) => {
  //   localStorage.setItem("chat_messages", JSON.stringify(messages));
  // };

  const handleRecipients = (major) => {
    answer2();
    let input = JSON.stringify(major);
    console.log("input ", input);
  };

  const handleInputPhrase = (question) => {
    answer3();
    let input = JSON.stringify(question);
    console.log("question ", input);
  };
  const handleContactAdvisor = async () => {
    answer1();

    // let subject = "A student has a question for you!";
    // let question =
    //   "I am waitlisted for a course. Can you please enroll me in this class. \n" +
    //   "Please responde to email : " +
    //   "\n" +
    //   studentEmail;
    // let response = await fetch(
    //   //`https://smartadvisorapi.azure-api.net/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`,
    //   `https://localhost:7050/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`,
    //   { method: "POST" }
    // );
    // response = await response.json();
    // console.log("answer:  ", response.Value.Answers[0].Answer);
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
            handleRecipients,
            handleInputPhrase,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

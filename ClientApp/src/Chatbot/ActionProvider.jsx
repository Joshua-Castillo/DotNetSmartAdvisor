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

  const handleQuestion = async (insertQuestion) => {
    let response = await fetch(
      `https://localhost:7050/api/QuestionAnswering/question/${insertQuestion}`,
      //`https://${window.location.hostname}/api/QuestionAnswering/${insertQuestion}`,
      { method: "POST" }
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

  const handleFacultyCatalog = async () => {
    let response = await fetch(`https://localhost:7050/api/Cosmos`, {
      method: "GET",
    });
    response = await response.json();

    console.log(response[0]);

    let botMessage = createChatBotMessage("get em");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSessions = async (message) => {
    let response = await fetch(`https://localhost:7050/api/Cosmos`, {
      method: "GET",
    });
    response = await response.json();
    console.log(response[1]);
    let botMessage = createChatBotMessage("get em");
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

  const handleEmail = async (advisorEmail, studentEmail, subject, question) => {
    let response = await fetch(
      `https://localhost:7050/api/QuestionAnswering/email/${advisorEmail}/${studentEmail}/${subject}/${question}`,
      { method: "POST" }
    );
    response = await response.json();
    console.log("response ", response);
  };

  const answer1 = () => {
    let botquestion = createChatBotMessage(
      "I can't do that, we'll have to send an email to your advisor! Please enter your email :"
    );
    console.log(botquestion);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botquestion],
    }));
  };

  const answer2 = () => {
    let botMessage = createChatBotMessage("Please enter your Major :");
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const answer3 = () => {
    let botMessage = createChatBotMessage(
      "Please provide a subject line.       Possible Format <Main topic for student name, studeny Id>: "
    );
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const answer4 = () => {
    let botMessage = createChatBotMessage(
      "Please detail your question below.     Suggested Format <I am [insert name and sutdent ID]. Your question> : "
    );
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const answer5 = () => {
    let botMessage = createChatBotMessage("The email has been sent! ");
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const answer6 = () => {
    let botMessage = createChatBotMessage(
      "If you would like to proceed, please enter the email provided! If not, ask anyother question. "
    );
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleRecipients = (major) => {
    answer2();
  };
  const parseRecipients = async (details) => {
    let response = await fetch(
      `https://localhost:7050/api/QuestionAnswering/question/${details}`,
      { method: "POST" }
    );
    response = await response.json();

    let answer = response.Value.Answers[0].Answer;
    console.log(answer.substring(0));
    console.log(answer.search("Email: "));
    var e = answer.split("Email: ");
    console.log("e", e);
    let advisorEmail = e.find((element) => element.includes("@"));
    let botMessage = createChatBotMessage(
      "This is the email of your advisor for your department: " +
        advisorEmail +
        "\n Shall we proceed? "
    );
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    answer6();
  };

  const handleInputSubject = (subject) => {
    answer3();
  };
  const handleInputPhrase = (question) => {
    answer4();
  };
  const handleSentMessage = () => {
    answer5();
  };
  const handleNotSent = () => {
    let botMessage = createChatBotMessage("The email has not been sent.");
    console.log(botMessage);
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleContactAdvisor = async () => {
    answer1();
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
            handleInputSubject,
            handleSentMessage,
            parseRecipients,
            handleNotSent,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;

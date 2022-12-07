import React from "react";
import { MyChatbotComponent } from "./Chatbot.jsx";
//import AddClass from "../photos/CourseCart.png"

export const Home = () => {
  return (
    <>
      {/* <img src={AddClass} className="img-fluid translate-center" alt="img-background"/> */}
      <div className="position-absolute bottom-0 end-0 translate-right">
        <MyChatbotComponent />
      </div>
    </>
  );
};

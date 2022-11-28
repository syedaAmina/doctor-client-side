import React from "react";
import useTitle from "../../../hooks/useTitle";
import Banar from "../Banar/Banar";
import Services from "../Services/Services";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banar></Banar>
      <Services></Services>
    </div>
  );
};

export default Home;

import "./ResultScreen.scss";
import Option from "../components/Option";
import getRandomOption from "../utils/getRandomOption";
import getResult from "../utils/getResult";
import { ScoreContext } from "../App";
import { useState, useEffect, useContext } from "react";

const ResultScreen = ({ chosenOption, backToHomeFnc }) => {
  const { setScore } = useContext(ScoreContext);
  const [houseOpt, setHouseOpt] = useState({ name: "wait" });
  const [result, setResult] = useState({ value: false });

  useEffect(() => {
    setTimeout(() => {
      setHouseOpt(getRandomOption());
    }, 1000);
  }, []);
  useEffect(() => {
    if (houseOpt.name && houseOpt.name !== "wait") {
      let result = getResult(chosenOption.name, houseOpt.name);
      setResult(result);
      if (result.value === "YOU WIN") setScore((oldScore) => oldScore + 1);
    }
  }, [houseOpt]);

  return (
    <section className="resultScreen">
      <Option
        data={chosenOption}
        extraClassName="chosenOpt"
        highlighted={result.value === "YOU WIN" || false}
        id={4}
      ></Option>
      <h3 className="chosenOptTitle">YOU PICKED</h3>
      <Option
        data={houseOpt}
        extraClassName="houseOpt highlitedOption"
        highlighted={result.value === "YOU LOSE" || false}
        id={5}
      ></Option>
      <h3 className="houseOptTitle">THE HOUSE PICKED</h3>
      {result.value && (
        <>
          <h1 className="resultTitle">{result.value}</h1>
          <button onClick={() => backToHomeFnc()} className="playAgain">
            PLAY AGAIN
          </button>
        </>
      )}
    </section>
  );
};

export default ResultScreen;

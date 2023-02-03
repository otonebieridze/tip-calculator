import { useEffect, useState } from "react";
import styles from "./TipCalculator.module.css";
import dollarIcon from "../images/icon-dollar.svg";
import personIcon from "../images/icon-person.svg";

export default function TipCalculator() {
  const [bill, setBill] = useState<number | string>("");
  const [tip, setTip] = useState<number | string>("");
  const [tipValue, setTipValue] = useState<number | string>("");
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [numOfPeople, setNumOfPeople] = useState<number | string>("");

  const [tipAmount, setTipAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [isAnyError, setIsAnyError] = useState<boolean>(false);

  const selectTip = (selectedTip: number, index: number) => {
    setTip(selectedTip);
    setSelectedBtn(index);
    setTipValue("");
  };

  const tipValueChange = (enteredTipValue: string) => {
    setTip(Number(enteredTipValue));
    setTipValue(enteredTipValue);
    setSelectedBtn(0)
  };

  const resetEverything = () => {
    setBill("");
    setTip("");
    setTipValue("");
    setNumOfPeople("");
  };

  useEffect(() => {
    if (
      Number(bill) < 0 ||
      Number(tip) < 0 ||
      (Number(numOfPeople) === 0 && numOfPeople !== "") ||
      Number(numOfPeople) < 0 ||
      (Number(numOfPeople) !== parseInt(String(numOfPeople)) &&
        numOfPeople !== "")
    ) {
      setIsAnyError(true);
    } else {
      setIsAnyError(false);
      setTipAmount((Number(bill) * Number(tip)) / 100 / Number(numOfPeople));
    }
  }, [bill, tip, numOfPeople]);

  useEffect(() => {
    setTotal(tipAmount + Number(bill) / Number(numOfPeople));
  }, [tipAmount]);

  return (
    <div className={styles.container}>
      <div className={styles["left-side-container"]}>
        <div className={styles["left-side-box"]}>
          <p className={styles["box-title"]}>Bill</p>
          <img className={styles.icon} src={dollarIcon} alt="dollar-icon" />
          <input
            className={
              Number(bill) < 0
                ? `${styles.input} ${styles["input-error"]}`
                : `${styles.input}`
            }
            onChange={(e) => setBill(e.target.value)}
            type="number"
            placeholder="0"
            value={bill}
          />
          <p className={styles["error-msg"]}>
            {Number(bill) < 0 ? "Invalid input!" : null}
          </p>
        </div>
        <div className={styles["left-side-box"]}>
          <p className={styles["box-title"]}>Select Tip %</p>
          <div className={styles["tip-buttons-container"]}>
            <button
              className={
                selectedBtn === 1
                  ? `${styles["tip-btn"]} ${styles["selected-btn"]}`
                  : `${styles["tip-btn"]}`
              }
              onClick={() => selectTip(5, 1)}
            >
              5%
            </button>
            <button
              className={
                selectedBtn === 2
                  ? `${styles["tip-btn"]} ${styles["selected-btn"]}`
                  : `${styles["tip-btn"]}`
              }
              onClick={() => selectTip(10, 2)}
            >
              10%
            </button>
            <button
              className={
                selectedBtn === 3
                  ? `${styles["tip-btn"]} ${styles["selected-btn"]}`
                  : `${styles["tip-btn"]}`
              }
              onClick={() => selectTip(15, 3)}
            >
              15%
            </button>
            <button
              className={
                selectedBtn === 4
                  ? `${styles["tip-btn"]} ${styles["selected-btn"]}`
                  : `${styles["tip-btn"]}`
              }
              onClick={() => selectTip(25, 4)}
            >
              25%
            </button>
            <button
              className={
                selectedBtn === 5
                  ? `${styles["tip-btn"]} ${styles["selected-btn"]}`
                  : `${styles["tip-btn"]}`
              }
              onClick={() => selectTip(50, 5)}
            >
              50%
            </button>
            <input
              className={
                Number(tip) < 0
                  ? `${styles["tip-input"]} ${styles["input-error"]}`
                  : `${styles["tip-input"]}`
              }
              onChange={(e) => tipValueChange(e.target.value)}
              type="number"
              placeholder="Custom"
              value={tipValue}
            />
            <p className={styles["error-msg"]}>
              {Number(tip) < 0 ? "Invalid input!" : null}
            </p>
          </div>
        </div>
        <div className={styles["left-side-box"]}>
          <p className={styles["box-title"]}>Number of People</p>
          <img className={styles.icon} src={personIcon} alt="dollar-icon" />
          <p className={styles["error-msg"]}>
            {Number(numOfPeople) === 0 && numOfPeople !== ""
              ? "Can't be zero!"
              : null}
          </p>
          <p className={styles["error-msg"]}>
            {Number(numOfPeople) < 0 ? "Invalid input!" : null}
          </p>
          <p className={styles["error-msg"]}>
            {Number(numOfPeople) === parseInt(String(numOfPeople)) ||
            numOfPeople === ""
              ? null
              : "Invalid input!"}
          </p>
          <input
            className={
              (Number(numOfPeople) === 0 && numOfPeople !== "") ||
              Number(numOfPeople) < 0 ||
              (Number(numOfPeople) !== parseInt(String(numOfPeople)) &&
                numOfPeople !== "")
                ? `${styles.input} ${styles["input-error"]}`
                : `${styles.input}`
            }
            onChange={(e) => setNumOfPeople(e.target.value)}
            type="number"
            placeholder="0"
            value={numOfPeople}
          />
        </div>
      </div>

      <div className={styles["right-side-container"]}>
        <div className={styles["right-side-box"]}>
          <div>
            <h3>Tip Amount</h3>
            <p>/ person</p>
          </div>
          <h2>
            {bill === "" || tip === "" || numOfPeople === "" || isAnyError
              ? `0.00$`
              : `${tipAmount.toFixed(2)}$`}
          </h2>
        </div>
        <div className={styles["right-side-box"]}>
          <div>
            <h3>Total</h3>
            <p>/ person</p>
          </div>
          <h2>
            {bill === "" || tip === "" || numOfPeople === "" || isAnyError
              ? `0.00$`
              : `${total.toFixed(2)}$`}
          </h2>
        </div>
        <button onClick={resetEverything} className={styles["reset-btn"]}>
          RESET
        </button>
      </div>
    </div>
  );
}

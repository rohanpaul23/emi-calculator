import React, { useState, useEffect } from "react";
import "./emiCalculator.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanRoi, setLoanRoi] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(1);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmountWithInterest, setTotalAmountWithInterest] = useState(0);

  const [dataSet, setDataSet] = useState({
    labels: ["Intereset Amount", "Principal Amount"],
    datasets: [
      {
        label: "# of Votes",
        data: [loanAmount, 12],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const interest = (loanAmount * (loanRoi * 0.01)) / loanTenure;
    const totalAmountWithInterest = loanAmount / loanTenure + interest;
    setTotalInterest(interest);
    setTotalAmountWithInterest(totalAmountWithInterest.toFixed(0));

    const data = {
      labels: ["Interest Amount", "Principal Amount"],
      datasets: [
        {
          label: "",
          data: [interest, loanAmount],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)"
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1
        }
      ]
    };
    setDataSet(data);
  }, [loanAmount, loanRoi, loanTenure]);

  const handleChange = (type, value) => {
    switch (type) {
      case "amount":
        setLoanAmount(value);
        break;
      case "roi":
        setLoanRoi(value);
        break;
      case "tenure":
        setLoanTenure(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="emiCalc">
      <div className="loan">
        <div className="sectionTitle">Loan Details</div>
        <div className="fieldValue">
          <label>Loan Amount</label>
          <div>{"₹" + loanAmount}</div>
        </div>
        <input
          className="rangeField"
          type="range"
          min={100000}
          max={10000000}
          onChange={e => handleChange("amount", e.target.value)}
          value={loanAmount}
        />
        <div className="fieldValue">
          <label>Rate Of Interest</label>
          <div>{loanRoi + "%"}</div>
        </div>
        <input
          className="rangeField"
          type="range"
          min={6.5}
          max={30}
          step="0.1"
          onChange={e => handleChange("roi", e.target.value)}
          value={loanRoi}
        />
        <div className="fieldValue">
          <label>Loan Tenure</label>
          <div>{loanTenure + "Yr"}</div>
        </div>
        <input
          className="rangeField"
          type="range"
          min={1}
          max={30}
          onChange={e => handleChange("tenure", e.target.value)}
          value={loanTenure}
        />
      </div>
      <div className="loan">
        <div className="sectionTitle">Loan breakdown</div>
        <div className="breakdown">
          <div className="pieChart">
            <Pie data={dataSet} />
          </div>

          <div className="emiDetails">
            <div className="fieldValue">
              <label>Principal Amount</label>
              <div>{"₹" + parseFloat(loanAmount).toFixed(2)}</div>
              {/* <div>{loanAmount.toFixed(2)}</div> */}
            </div>
            <div className="fieldValue">
              <label>Total Interest Amount</label>
              <div>{"₹" + parseFloat(totalInterest).toFixed(2)}</div>
            </div>
            <div className="fieldValue">
              <label>Total Amount</label>
              <div>
                {"₹" + parseFloat(loanAmount + totalInterest).toFixed(2)}
              </div>
            </div>
            <div className="fieldValue">
              <label>Monthly EMI</label>
              <div>{"₹" + parseFloat(totalAmountWithInterest).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;

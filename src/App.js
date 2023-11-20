import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // If using js-cookie
import _ from "underscore";
import "./App.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function App() {
  // Define the default state values here
  const defaultState = {
    name: "Steven",
    isMale: true,
    chkrandom: true,
    factors: [
      {
        title: "Strengths:",
        list: [
          {
            title: "Participation",
            comment:
              "#name has good participation in class discussions, and voluntarily answers questions without needing to be called on.",
            checked: false,
          },
          {
            title: "Speaking",
            comment: "His speaking is strong for his level.",
            checked: false,
          },
          {
            title: "Reading Comprehension",
            comment:
              "#name is strong at reading, and answers the comprehension questions well.",
            checked: false,
          },
          {
            title: "Work Ethic",
            comment:
              "He has a good work ethic in the classroom, and will always do the tasks assigned in class.",
            checked: false,
          },
          {
            title: "Focus",
            comment:
              "He is very focused on the tasks in the classroom, and does not get distracted easily.",
            checked: false,
          },
          {
            title: "Project Output",
            comment:
              "He works well in groups and has good quality output for the projects.",
            checked: false,
          },
          {
            title: "Vocab Score",
            comment: "#name consistently gets strong vocab scores every week.",
            checked: false,
          },
        ],
      },
      {
        title: "Weaknesses:",
        list: [
          {
            title: "Participation",
            comment: "#name does not participate in classroom discussion.",
            checked: false,
          },
          {
            title: "Speaking",
            comment: "His speaking is weak for his level.",
            checked: false,
          },
          {
            title: "Reading Comprehension",
            comment:
              "He seems to struggle with understanding the reading and answering questions.",
            checked: false,
          },
          {
            title: "Work Ethic",
            comment:
              "Sometimes, he will not do the work I ask of all the students during class.",
            checked: false,
          },
          {
            title: "Focus",
            comment:
              "I often find #name not paying attention during the class and getting distracted.",
            checked: false,
          },
          {
            title: "Vocab Score",
            comment:
              "Unfortunately, #name will often score below average on the vocab quizzes, which indicates a lack of studying.",
            checked: false,
          },
          {
            title: "Project Output",
            comment:
              "#name will not work very hard in the projects, and often lets his other group mates do most of the work.",
            checked: false,
          },
          {
            title: "Disruptive Behavior",
            comment:
              "He is often disruptive during the lesson and distracts other students.",
            checked: false,
          },
        ],
      },
      {
        title: "Final:",
        list: [{ title: "Plan For Improvement", comment: "", checked: false }],
      },
    ],
  };
  const getNewFactor = () => {
    return {
      title: "New",
      comment: "",
      checked: true,
    };
  };
  const getCookieOrDefault = () => {
    if (Cookies.get('state') !== undefined){
      return JSON.parse(Cookies.get('state'));
    }
    return defaultState;
  };
  
  // Initialize the state with the default values
  const [state, setState] = useState(getCookieOrDefault);
  const [commentOut, setComment] = useState("");
  const [copied, setCopied] = useState("");

  const changeGender = (isMale) => {
    setState((prevState) => {
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      deepCopy.isMale = isMale;
      return deepCopy;
    });
  };
  const checkRandom = () => {
    setState((prevState) => {
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      deepCopy.chkrandom = !prevState.chkrandom;
      return deepCopy;
    });
  };
  const nameChange = (event) => {
    setState((prevState) => {
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      deepCopy.name = event.target.value;
      return deepCopy;
    });
  };
  const updateParentFactor = (title, parentIndex) => {
    setState((prevState) => {
      // Create a new copy of the previous state
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      // update desired factor
      deepCopy.factors[parentIndex].title = title;
      // Return the updated copy of the new state
      return deepCopy;
    });
  };
  const updateFactorCheck = (parentIndex, index) => {
    setState((prevState) => {
      // Create a new copy of the previous state
      const deepCopy = JSON.parse(JSON.stringify(prevState));
      const factor = deepCopy.factors[parentIndex].list[index];

      // replace desired factor
      factor.checked = !factor.checked;

      // Return the updated copy of the new state
      return deepCopy;
    });
  };
  const updateFactorTitle = (title, parentIndex, index) => {
    setState((prevState) => {
      // Create a new copy of the previous state
      const deepCopy = JSON.parse(JSON.stringify(prevState));

      // replace desired factor
      deepCopy.factors[parentIndex].list[index].title = title;

      // Return the updated copy of the new state
      return deepCopy;
    });
  };
  const updateFactorComment = (comment, parentIndex, index) => {
    setState((prevState) => {
      // Create a new copy of the previous state
      const deepCopy = JSON.parse(JSON.stringify(prevState));

      // replace desired factor
      deepCopy.factors[parentIndex].list[index].comment = comment;

      // Return the updated copy of the new state
      return deepCopy;
    });
  };
  const addNewFactor = (parentIndex) => {
    setState((prevState) => {
      // Create a new copy of the previous state
      const deepCopy = JSON.parse(JSON.stringify(prevState));

      // replace desired factor
      deepCopy.factors[parentIndex].list = [
        getNewFactor(),
        ...deepCopy.factors[parentIndex].list,
      ];
      console.log(deepCopy.factors);

      // Return the updated copy of the new state
      return deepCopy;
    });
  };
  const deleteFactor = (parentIndex, index) => {
    if (window.confirm("Are you sure? Can't be undone")) {
      setState((prevState) => {
        // Create a new copy of the previous state
        const deepCopy = JSON.parse(JSON.stringify(prevState));
        const list = deepCopy.factors[parentIndex].list;
        // replace desired factor
        deepCopy.factors[parentIndex].list = [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ];
        // Return the updated copy of the new state
        return deepCopy;
      });
    }
  };
  const resetState = () => {
    if (
      window.confirm("Are you sure you want to reset? This action is permanent")
    ) {
      setState(defaultState);
      setCopied('')
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(commentOut)
      .then(() => {
        setCopied("Text copied to clipboard!");
      })
      .catch((error) => {
        setCopied("Copy to clipboard failed: Try a better browser");
        console.error("Copy to clipboard failed: ", error);
      });
  };
  useEffect(() => {
    //write comment on state change
    let comment = "";

    state.factors.forEach((factorParent) => {
      comment += factorParent.title.trim() + "\n";
      let list = state.chkrandom
        ? _.shuffle(factorParent.list)
        : factorParent.list;
      list.forEach((factor) => {
        if (factor.checked)
          comment +=
            capitalize(cleanString(factor.comment, state.name, state.isMale)) +
            " ";
      });
      comment += "\n\n";
    });
    setComment(comment.trim());
    setCopied('')
    //set cookie
    Cookies.set('state', JSON.stringify(state), {expires: 365})
  }, [state]);

  return (
    <div className="App">
      <div className="container py-4" >
        <div className="row">
          <div className="col-md mb-4">
            <div id="studentInfoDiv" className="rounded p-3">
              <h5>
                Student Info
                <button
                  id="resetBtn"
                  className="btn btn-outline-secondary float-end"
                  onClick={resetState}
                >
                  Reset Defaults
                </button>
              </h5>
              <div className="mb-3">
                <label htmlFor="textName" className="form-label">
                  Name:
                  <InfoBubble message={"You can use the code '#name' in the comments and it will be automatically replaced with this name"}/>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textName"
                  placeholder=""
                  value={state.name}
                  onChange={nameChange}
                />
              </div>
              Gender:
              <InfoBubble message={"Will try to replace gender specific pronouns in the comments. e.g. 'him/her, himself/herself' etc..."}/>
              <br />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  checked={state.isMale}
                  onChange={() => changeGender(true)}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  checked={!state.isMale}
                  onChange={() => changeGender(false)}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <label className="mt-3">
                <input
                  id="chkrandom"
                  type="checkbox"
                  className="form-check-input"
                  checked={state.chkrandom}
                  onChange={checkRandom}
                />
                &nbsp; Random Sentence Order
                <InfoBubble message={"Jumbles the sentences if the comments are getting repetitive."}/>
              </label>
            </div>
            {state.factors.map((factor, index) => (
              <FactorList
                key={"factor" + index}
                parentFactor={factor}
                parentIndex={index}
                updateParentFactor={updateParentFactor}
                updateFactorCheck={updateFactorCheck}
                updateFactorTitle={updateFactorTitle}
                updateFactorComment={updateFactorComment}
                addNewFactor={addNewFactor}
                deleteFactor={deleteFactor}
              />
            ))}
          </div>
          <div className="col-md">
            <div id="generateDiv" className="rounded p-3 sticky-column">
            <h5>
                Comment Output
                <button
                id="writecomment"
                className="btn btn-primary float-end"
                onClick={copyToClipboard}
              >
                Copy Comment
              </button>
              </h5>
              
              <span
                id="alertCopy"
                className="text-danger"
                style={{ display: copied === "" ? "none" : "" }}
              >
                {copied}
              </span>
              <br />
              <textarea
                id="commentout"
                className="form-control mt-3 border-2"
                rows="10"
                value={commentOut}
                readOnly={true}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FactorList(props) {
  const {
    parentFactor,
    parentIndex,
    updateParentFactor,
    updateFactorCheck,
    updateFactorTitle,
    updateFactorComment,
    addNewFactor,
    deleteFactor,
  } = props;

  return (
    <div className="factorGroup rounded">
      <div className="input-group mt-4 pb-3">
        <input
          className="factorListTitle form-control form-control-lg border-2"
          value={parentFactor.title}
          onChange={(event) =>
            updateParentFactor(event.target.value, parentIndex)
          }
        />
        <button
          className="newFactor btn btn-primary"
          onClick={() => addNewFactor(parentIndex)}
        >
          New +
        </button>
      </div>
      <div className="factorList">
        {parentFactor.list.map((factor, index) => (
          <div key={"childFactor" + parentIndex + index} className="factor px-3 pb-3">
            <div className="input-group">
              <label className="input-group-text">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={factor.checked}
                  onChange={() => updateFactorCheck(parentIndex, index)}
                />
              </label>
              <input
                className="factorTitle form-control"
                value={factor.title}
                onChange={(event) =>
                  updateFactorTitle(event.target.value, parentIndex, index)
                }
              />
              <button
                className="deleteFactor btn btn-danger"
                onClick={() => deleteFactor(parentIndex, index)}
              >
                X
              </button>
            </div>
            <textarea
              className="form-control border-top-0"
              rows="3"
              value={factor.comment}
              onChange={(event) =>
                updateFactorComment(event.target.value, parentIndex, index)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoBubble({message}) {
  return (
    <OverlayTrigger overlay={<Tooltip>{message}</Tooltip>}>
      <i className="fa fa-circle-info ms-1"></i>
    </OverlayTrigger>
  );
}

//string helpers
function cleanString(factor, name, isMale, genderclean = true) {
  factor = factor.replace(/#name/g, name);

  if (genderclean) {
    factor = factor.replace(/\bhis\b/gi, isMale ? "his" : "her");
    factor = factor.replace(/\bher\b/gi, isMale ? "his" : "her");

    factor = factor.replace(/\bhim\b/gi, isMale ? "him" : "her");
    factor = factor.replace(/\bher\b/gi, isMale ? "him" : "her");

    factor = factor.replace(/\bhe\b/gi, isMale ? "he" : "she");
    factor = factor.replace(/\bshe\b/gi, isMale ? "he" : "she");

    factor = factor.replace(/\bhimself\b/gi, isMale ? "himself" : "herself");
    factor = factor.replace(/\bherself\b/gi, isMale ? "himself" : "herself");
  }

  return factor;
}
function capitalize(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}

export default App;

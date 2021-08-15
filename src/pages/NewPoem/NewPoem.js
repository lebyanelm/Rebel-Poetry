import IonIcon from "@reacticons/ionicons";
import React from "react";
import styles from "./NewPoem.module.scss";

class NewPoem extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = [];
  }

  componentDidMount() {
    this.inputs.forEach((input) => {
      input.setAttribute("style", `height: 50px; overflow-y: hidden;`);

      // When a selection is made of a portion of text, show options
      input.onselect = (event) => {};

      input.oninput = (event) => {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
      };
    });
  }

  render() {
    return (
      <div className="page-container flex">
        <div className={styles.NewPoemInputContainer}>
          {/* The title input of the poem */}
          <div className={styles.NewPoemInput}>
            <div className={styles.NewPoemInputButton}>
              <IonIcon name="add-outline"></IonIcon>
            </div>
            <textarea
              type="text"
              placeholder="Title..."
              className={styles.NewPoemTitle}
              ref={(element) => this.inputs.push(element)}
            />
          </div>

          {/* The body input of the poem */}
          <div className={styles.NewPoemInput}>
            <textarea
              type="text"
              placeholder="Body..."
              className={styles.NewPoemBody}
              ref={(element) => this.inputs.push(element)}
            />
          </div>
        </div>
        <div className={styles.NewPoemPageExtras}>
          <p>Editing poem in draft</p>

          <div className="flex">
            <button>Publish</button>
            <button className="outline">Scheduled publish</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPoem;

import React, { Component } from "react";
import styles from "./PoemPostInput.module.scss";
import IonIcon from "@reacticons/ionicons";
import { BeatLoader } from "react-spinners";

class PoemPostInput extends Component {
  state = {
    isAnonymousPublish: false,
  };

  toggleIdentity = () => {
    this.setState({ isAnonymousPublish: !this.state.isAnonymousPublish });
  };

  render() {
    return (
      <div className={styles.PoemInputContainer}>
        <input
          className={styles.PoemInputTitle}
          placeholder="Type a poem title here..."
        />
        <textarea
          className={styles.PoemInput}
          placeholder="Craft your poem in this space, resize height if needed."
        ></textarea>

        <br />
        <br />
        <input
          type="text"
          className={styles.PoemTagsInput}
          placeholder="Type comma-separated tags of the poem (Optional)"
        />

        <div className={styles.Buttons}>
          <section>
            <button className="outline">
              <span>Attach Thumbnail</span>
            </button>

            <button>
              <span>Feature a Poet</span>
            </button>

            <button>
              <span>Preview & Publish</span>
            </button>
          </section>
          <section>
            <a
              className={styles.PostingAuthority}
              onClick={this.toggleIdentity}
            >
              {this.state.isAnonymousPublish ? "Anonymous" : "Libby Lebyane"}
            </a>
            &mdash;
            {/* When the user updates the poem draft */}
            <BeatLoader></BeatLoader>
            <span className={styles.SyncingStatus}>
              Syncing to draft (<a>Delete</a>)
            </span>
          </section>
        </div>
      </div>
    );
  }
}

export default PoemPostInput;

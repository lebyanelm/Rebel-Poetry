import React, { Component } from 'react';
import styles from './PoemPostInput.module.scss';
import IonIcon from '@reacticons/ionicons';
import { BeatLoader } from 'react-spinners';

class PoemPostInput extends Component {
  state = {
    isAnonymousPublish: false
  }

  toggleIdentity = () => {
    this.state.isAnonymousPublish = !this.state.isAnonymousPublish;
    this.setState({ ...this.state });
  }
  
  render() {
    return (
      <div className={styles.PoemInputContainer}>
        <input className={styles.PoemInputTitle} placeholder="Type a poem title here..." />
        <textarea className={styles.PeomInput} placeholder="Craft your poem in this space, resize height if needed."></textarea>
  
        
  
        <div className={styles.Buttons}>
          <section>
            <button className="outline">
              <span>Attach Thumbnail</span>
              <IonIcon name="attach"></IonIcon>
            </button>
  
            <button>
              <span>Publish Poem</span>
              <IonIcon name="arrow-forward"></IonIcon>
            </button>
          </section>
          <section>
            <a className={styles.PostingAuthority} onClick={this.toggleIdentity}>
              {this.state.isAnonymousPublish ? 'Anonymous' : 'Publishing as Libby Lebyane'}
            </a>
            &mdash;
  
            {/* When the user updates the poem draft */}
            <BeatLoader></BeatLoader>
            <span className={styles.SyncingStatus}>Syncing draft (<a>Delete</a>)</span>
          </section>
        </div>
      </div>
    )
  }
}

export default PoemPostInput;

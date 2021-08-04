import React, { useContext } from 'react';
import styles from './PoemPostInput.module.scss';
import { SessionContext } from '../../App';
import IonIcon from '@reacticons/ionicons';

const PoemPostInput = () => {
  return (
    <div className={styles.PoemInputContainer}>
      <input className={styles.PoemInputTitle} placeholder="Type a poem title here..." />
      <textarea className={styles.PeomInput} placeholder="Craft your poem in this space, resize height if needed."></textarea>

      

      <div className={styles.Buttons}>
        <button>
          <span>Attach Thumbnail</span>
          <IonIcon name="attach"></IonIcon>
        </button>

        <button>
          <span>Publish Poem</span>
          <IonIcon name="arrow-forward"></IonIcon>
        </button>
      </div>
    </div>
  )
};

export default PoemPostInput;

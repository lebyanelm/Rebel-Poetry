import React from 'react';
import styles from './Poem.module.scss';
import { Link } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons';
import PoemActions from '../PoemActions/PoemActions';

const Poem = () => (
  <div className={styles.Poem}>
    <div className={styles.PoemThumbnail} style={{backgroundImage: 'url(https://www.oprah.com/g/image-resizer?width=670&link=https://static.oprah.com/images/own/2011/master-class/episodes/103/master-class-maya-angelou-2-600x411.jpg)'}}></div>
    <div className={styles.PoemDetails}>
      <Link to="/poem?pid=8928899892">
        <header className={styles.PoemTitle}>
         A Young Sad Black Child
        </header>
      </Link>

      <span className={styles.PoemAuthor}>
        Written by 
        <Link to="poets/@roddyrich"> Edgar Allen Po.</Link>
        , featuring <Link to="poets/@roddyrich">Maya Angelou</Link>
        , <Link to="poets/@roddyrich">Joseph Rohghan</Link>
        , and <Link to="poets/@roddyrich">The Logical Minds</Link>
      </span>
      
      <span className={styles.PoemDescription}>I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.</span>

      <div className="tags flex">
        <Link to="/tag?name=30min_read"><div className="tag">18min Read</div></Link>
        <Link to="/tag?name=30min_read"><div className="tag">African Struggle</div></Link>
        <Link to="/tag?name=30min_read"><div className="tag">Black</div></Link>
        <Link to="/tag?name=30min_read"><div className="tag">Life</div></Link>
      </div>
    </div>

    {/* Poem Actions */}
    <PoemActions></PoemActions>
  </div>
);

export default Poem;

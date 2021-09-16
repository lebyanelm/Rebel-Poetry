import Poem from '../Poem/Poem';
import styles from './PoemsList.module.scss';

const PoemsList = ({ feed, isDrafts }) => {
  return (<div className={styles.PoemsGrid}>
    {feed.map((poem) => <Poem data={poem} isDraft={isDrafts}></Poem>)}
  </div>)
};

export default PoemsList;

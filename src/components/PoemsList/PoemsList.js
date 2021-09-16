import Poem from '../Poem/Poem';
import styles from './PoemsList.module.scss';

const PoemsList = ({ feed }) => {
  return (<div className={styles.PoemsGrid}>
    {feed.map((poem) => <Poem data={poem}></Poem>)}
  </div>)
};

export default PoemsList;

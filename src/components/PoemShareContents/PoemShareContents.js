import React from 'react';
import PropTypes from 'prop-types';
import styles from './PoemShareContents.module.scss';
import config from "../../config";
import { useToast } from '../../providers/ToastContext';
import IonIcon from '@reacticons/ionicons';

const PoemShareContents = ({pId, pTitle}) => {
  const [shareLink, setShareLink] = React.useState([config.FRONTEND, "poem", pId].join("/"))
  const {showToast} = useToast();
  
  return (
  <div className={styles.PoemShareContents} data-testid="PoemShareContents">
    <h4>Share with your friends</h4>
    <div className={styles.ShareLinkInput}>
      <input type="text" value={shareLink} disabled/>
      <button onClick={() => {
        navigator.clipboard.writeText(shareLink)
          .then(() => showToast("Your share link has been copied."))
      }}>Copy Link</button>
    </div>

    <h6>You can also share to</h6>
    <div className={styles.SocialMediaShare}>
      <a href={["https://api.whatsapp.com/send?text=Read poem ", pTitle, " on Rebbel Poetry using link ", shareLink].join("")} target="_blank"><IonIcon name="logo-whatsapp"></IonIcon></a>
      <a target="_blank" href={["https://www.facebook.com/sharer/sharer.php?u=", shareLink].join("")} class="fb-xfbml-parse-ignore"><IonIcon name="logo-facebook"></IonIcon></a>
    </div>
  </div>
)
};

export default PoemShareContents;

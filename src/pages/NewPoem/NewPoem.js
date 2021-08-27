import IonIcon from "@reacticons/ionicons";
import React from "react";
import styles from "./NewPoem.module.scss";
import { PuffLoader } from "react-spinners";
import { Link, useHistory, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import qs from "qs";
import { PoemService } from "../../services/Poem";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";

function NewPoem() {
  const { userToken } = useStorage();
  const { setIsLoaderVisible } = useLoaderState();
  const [draftData, setDraftData] = React.useState({
    did: "",
    title: "",
    body: "",
    thumbnail: "",
    featured_poets: [],
    is_anonymous: false,
    time_created: new Date().toISOString(),
    is_created: false,
  });
  const [changeInterval, setChangeInterval] = React.useState(null);

  const router = useHistory();

  React.useState(() => {
    document.title = [process.env.REACT_APP_NAME, "New Poem"].join(": ");

    // From the location of the page, determine the draft id or create a new one
    const params = qs.parse(router.location.search, {
      ignoreQueryPrefix: true,
    });
    const did = nanoid().toUpperCase();

    if (params.draft_id) {
      setDraftData({ ...draftData, did: params.draft_id });
      PoemService.getDraft(params.draft_id, userToken)
        .then((draft) => {
          console.log("Found draft:", draft);
          // Reload the draft data from the recovered draft
          setDraftData({
            did: params.draft_id,
            thumbnail: draft.thumbnail,
            title: draft.title,
            body: draft.body,
            featured_poets: draft.featured_poets,
            time_created: draft.time_created,
            is_anonymous: draft.is_anonymous,
            is_created: true,
          });
        })
        .catch((error) => console.log(error));
    } else {
      setDraftData({ ...draftData, did });
      router.push([router.location.pathname, "?draft_id=", did].join(""));
    }
  }, []);

  // When a field in the poem changes be sure to sync that change with the draft
  const onFieldChange = (ev) => {
    const changes = { name: ev.target.name, value: ev.target.value };
    setDraftData({ ...draftData, [changes.name]: changes.value });
    PoemService.updateDraft(draftData, userToken);
    // TODO: Change only on an interval.
  };

  // When the user needs to select image files
  const imageInputRef = React.useRef();
  const onImageSelect = () => {
    // Preview the file on the poem page then upload the image in the background
    if (imageInputRef.current.files.length) {
      const fileReader = new FileReader();
      fileReader.onloadend = () =>
        setDraftData({ ...draftData, thumbnail: fileReader.result });
      fileReader.readAsDataURL(imageInputRef.current.files[0]);

      // Upload the file to the backend server
      PoemService.uploadThumbnail(
        imageInputRef.current.files[0],
        userToken
      ).then((data) => {
        setDraftData({ ...draftData, thumbnail: data.large });
        PoemService.updateDraft(draftData, userToken);
      });
    }
  };

  // To be able to get rid of the change interval listener/timer use an effect clean up
  React.useEffect(() => {}, []);

  return (
    <div className={styles.PageContainer}>
      {/* New poem header element */}
      <div className={styles.NewPoemHeaderContainer}>
        <div className={styles.NewPoemImageContainer}>
          <input
            type="file"
            ref={imageInputRef}
            onChange={onImageSelect}
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp, image/bmp"
            hidden
          />
          <div
            className={styles.NewPoemImageSelector}
            onClick={() => imageInputRef.current.click()}
            style={{
              backgroundImage: `url(${draftData.thumbnail})`,
            }}
          >
            <IonIcon name="add-sharp"></IonIcon>
          </div>
        </div>
        <div className={styles.NewPoemDetails}>
          <input
            className={styles.NewPoemTitle}
            autoFocus={true}
            name="title"
            onChange={onFieldChange}
            value={draftData.title}
            placeholder="Poem title"
          ></input>

          <span>
            Currently syncing edits to{" "}
            <a href="/your_drafts" target="_blank" referrerPolicy="no-referrer">
              Draft ({draftData.did})
            </a>
            .
          </span>
          <table className={styles.PoemMetadataItems}>
            <tbody>
              <tr>
                <td>Written by</td>
                <td>
                  <Link
                    onClick={() =>
                      setDraftData({
                        ...draftData,
                        is_anonymous: !draftData.is_anonymous,
                      })
                    }
                  >
                    {draftData.is_anonymous ? "Anonymous" : "Yourself"}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Features</td>
                <td>
                  <Link>Add a rebbel</Link>
                </td>
              </tr>
              <tr>
                <td>Created on</td>
                <td>
                  <Link>{draftData.time_created}</Link>
                </td>
              </tr>
            </tbody>
          </table>

          <br />
          <div className="flex">
            <button
              onClick={() => {
                setIsLoaderVisible(true);
                PoemService.updateDraft(draftData, userToken)
                  .then(() => setIsLoaderVisible(false))
                  .catch(() => setIsLoaderVisible(false));
              }}
            >
              Save Draft
            </button>
            <button className="outline">Preview and Publish</button>
          </div>
        </div>
      </div>

      {/* The poem contents */}
      <div className={styles.NewPoemContentsContainer}>
        <textarea
          // rows={numberOfLines}
          placeholder="Type your poem body here..."
          rows={draftData.body.split("\n").length}
          name="body"
          onChange={onFieldChange}
          value={draftData.body}
        ></textarea>
      </div>
    </div>
  );
}

export default NewPoem;

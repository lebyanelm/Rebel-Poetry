import IonIcon from "@reacticons/ionicons";
import React from "react";
import styles from "./NewPoem.module.scss";
import ReactModal from "react-modal";
import { Link, useHistory, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";
import qs from "qs";
import { PoemService } from "../../services/Poem";
import { useLoaderState } from "../../providers/LoaderContext";
import { useStorage } from "../../providers/StorageContext";
import { useToast } from "../../providers/ToastContext";
import DraftPreview from "../../components/DraftPreview/DraftPreview";

function NewPoem() {
  const { userToken } = useStorage();
  const { setIsLoaderVisible } = useLoaderState();
  const { showToast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const router = useHistory();

  const [draftData, setDraftData] = React.useState({
    did: "",
    title: "",
    body: "",
    thumbnail: "",
    tags: [],
    featured_poets: [],
    is_anonymous: false,
    time_created: new Date().toISOString(),
    is_created: false,
  });
  const [changeInterval, setChangeInterval] = React.useState(null);

  const titleInputRef = React.createRef();

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
            time_created: draft.time_created.toString(),
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

    if (ev.target.name === "title")
      titleInputRef.current.style.height = titleInputRef.current.scrollHeight + "px";

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
  React.useEffect(() => { }, []);

  return (
    <div className={styles.PageContainer}>
      {/* When the preview and publish button is pressed */}
      <ReactModal
        isOpen={isPreviewOpen}
        onRequestClose={() => setIsPreviewOpen(false)}
        style={{
          overlay: { zIndex: 60000 },
          content: {
            width: "80%",
            margin: "auto",
            borderRadius: "0px",
            border: "3px solid black",
          },
        }}
      >
        <DraftPreview
          data={draftData}
          isPublished={(poemId) => {
            setIsPreviewOpen(false);
            router.push(["/poem/", poemId].join(""));
          }}
          token={userToken}
        ></DraftPreview>
      </ReactModal>

      {/* New poem header element */}
      <div
        className={styles.NewPoemHeaderContainer}
        style={{
          backgroundImage: `url(${draftData.thumbnail})`,
        }}
      >
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
          <textarea
            className={styles.NewPoemTitle}
            autoFocus={true}
            name="title"
            rows={draftData.title.split("\n").length}
            value={draftData.title}
            ref={titleInputRef}
            onChange={onFieldChange}
            placeholder="Poem title"
          ></textarea>

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
                  <span className="link"
                    onClick={() =>
                      setDraftData({
                        ...draftData,
                        is_anonymous: !draftData.is_anonymous,
                      })
                    }
                  >
                    {draftData.is_anonymous ? "Anonymous" : "Yourself"}
                  </span>
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
                  .then(() => {
                    showToast("Draft saved.");
                    setIsLoaderVisible(false);
                  })
                  .catch(() => setIsLoaderVisible(false));
              }}
            >
              Save Draft
            </button>
            <button className="outline" onClick={() => {
              setIsLoaderVisible(true);
              PoemService.updateDraft(draftData, userToken)
                .then(() => {
                  setIsLoaderVisible(false);
                  setIsPreviewOpen(true);
                }).catch((error) => {
                  console.log("Error something went wrong.");
                  setIsLoaderVisible(false);
                })
            }}>
              Preview and Publish
            </button>
          </div>
        </div>
      </div>

      {/* The poem contents */}
      <div className={styles.NewPoemContentsContainer}>
        <textarea
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

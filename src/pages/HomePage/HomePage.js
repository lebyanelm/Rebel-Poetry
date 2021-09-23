import React, { useContext, useEffect } from "react";
import PoemPostInput from "../../components/PoemPostInput/PoemPostInput";
import PoemsList from "../../components/PoemsList/PoemsList";
import * as superagent from "superagent";
import { useStorage } from "../../providers/StorageContext";
import { useLoaderState } from "../../providers/LoaderContext";
import { useToast } from "../../providers/ToastContext";
import { PoemService } from "../../services/Poem";

const HomePage = () => {
  const { userToken } = useStorage();
  const { showToast } = useToast();
  const { setIsLoaderVisible } = useLoaderState();

  // All the poems in the feed
  const [feed, setFeed] = React.useState([]);

  useEffect(() => {
    document.title = [process.env.REACT_APP_NAME, "Discover"].join(": ");

    // Retrieve a feed listing from the backend
    setIsLoaderVisible(true);
    if (userToken) {
      PoemService.getUnauthenticatedFeed()
        .then((poems) => {
          setIsLoaderVisible(false);
          setFeed([...feed, ...poems]);
        });
    } else {
      PoemService.getUnauthenticatedFeed()
        .then((poems) => {
          setIsLoaderVisible(false);
          setFeed([...feed, ...poems]);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="page-container">
        {/* Listed poems */}
        <h1>Discover</h1>
        <PoemsList feed={feed}></PoemsList>
      </div>
    </React.Fragment>
  );
};

export default HomePage;

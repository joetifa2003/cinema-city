import React, { useState } from "react";
import { db, fb } from "../../firebase";
import Swal from "sweetalert2";
import MovieSeries, { Type } from "../../models/MovieSeries";
import TextBox from "../../components/UI/TextBox";
import AsyncSelect from "react-select/async";

const AddEpisode = () => {
  const [series, setSeries] = useState<MovieSeries>();
  const [link, setLink] = useState("");
  const [download_link, setDownloadLink] = useState("");
  const [episode, setEpisode] = useState("");
  const [value, setValue] = useState("");

  const loadSeries = async () => {
    const snapshot = await db
      .collection("MoviesSeries")
      .where("type", "==", Type.SERIES)
      .where("name_query", "array-contains", value.toLowerCase())
      .get();

    return snapshot.docs.map((doc) => ({
      value: Object.assign(doc.data(), { id: doc.id }) as MovieSeries,
      label: doc.data().name,
    }));
  };

  const addEpisode = async () => {
    if (!series) return Swal.fire("Please select series frist!", "", "error");
    db.collection("MoviesSeries")
      .doc(series.id)
      .collection("Episodes")
      .add({
        series_id: series.id,
        link,
        download_link,
        episode: parseInt(episode),
        timestamp: fb.firestore.FieldValue.serverTimestamp(),
      })
      .then(() =>
        Swal.fire(
          `Episode number ${episode} added to ${series.name}`,
          "",
          "success"
        )
      );
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full"
      dir="ltr"
    >
      <div className="container p-5 text-black bg-white border-4 border-black">
        <div className="mb-2 font-bold">Series</div>
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadSeries}
          onChange={(value: any) => {
            setSeries(value.value);
          }}
          onInputChange={(value: any) => {
            setValue(value);
            return value;
          }}
          placeholder="Series"
        />
        <div className="my-5 c-gap-wrapper">
          <div className="flex flex-row flex-wrap c-gap-padding c-gap-8">
            <div className="w-full md:w-1/2">
              <TextBox
                label="Episode number"
                onChange={(e) => {
                  setEpisode(e.target.value);
                }}
                value={episode}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="Episode link"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="Download link"
                onChange={(e) => {
                  setDownloadLink(e.target.value);
                }}
                value={download_link}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            className="btn-primary"
            onClick={() => {
              addEpisode();
            }}
          >
            Add episode {`${series?.name || ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEpisode;

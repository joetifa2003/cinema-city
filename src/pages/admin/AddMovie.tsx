import React, { useState } from "react";
import Swal from "sweetalert2";
import TextArea from "../../components/UI/TextArea";
import TextBox from "../../components/UI/TextBox";
import { db, fb } from "../../firebase";
import MultiSelect from "react-multi-select-component";
import { Type } from "../../models/Movie";
import Select from "react-select";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");
  const [serverLink, setServerLink] = useState("");
  const [download_link, setDownloadLink] = useState("");
  const [categories, setCategories] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [imdb, setImdb] = useState<number>();
  const [length, setLength] = useState<number>(0);
  const [country, setCountry] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [type, setType] = useState(Type.MOVIE);
  const categoriesOptions = [
    { value: "انمي", label: "انمي" },
    { value: "تركي", label: "تركي" },
    { value: "اجنبي", label: "اجنبي" },
    { value: "عريي", label: "عريي" },
    { value: "اكشن", label: "اكشن" },
    { value: "اثاره", label: "اثاره" },
    { value: "دراما", label: "دراما" },
    { value: "حرب", label: "حرب" },
    { value: "نفسي", label: "نفسي" },
    { value: "رومانسي", label: "رومانسي" },
    { value: "دموي", label: "دموي" },
    { value: "الغاز", label: "الغاز" },
  ];
  const typeOptions = [
    { label: "Movie", value: "movie" },
    { label: "Series", value: "series" },
  ];
  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Egypt", value: "Egypt" },
    { label: "Turkey", value: "Turkey" },
    { label: "Japan", value: "Japan" },
  ];
  const warningsOptions = [
    { label: "عائلي", value: "عائلي" },
    { label: "جنس", value: "جنس" },
    { label: "عنف", value: "عنف" },
    { label: "الفاظ", value: "الفاظ" },
    { label: "اشراف عائلي", value: "اشراف عائلي" },
    { value: "+16", label: "+16" },
    { value: "+18", label: "+18" },
    { value: "+21", label: "+21" },
  ];

  const getQueryArray = (query: string) => {
    const querySplited = query.split(" ");
    const queryLength = querySplited.length;
    const arr: string[] = [];

    for (let i = 0; i < queryLength; i++) {
      const currentText = querySplited.join(" ");
      for (let j = 0; j < currentText.length; j++) {
        arr.push(currentText.substr(0, j + 1));
      }
      querySplited.shift();
    }

    return arr;
  };

  const addMovie = () => {
    db.collection("MoviesSeries")
      .add({
        name,
        name_query: getQueryArray(name.toLocaleLowerCase()),
        img,
        year,
        desc,
        server_link: serverLink,
        download_link,
        categories: categories.map((categorie: any) => categorie.value),
        warnings: warnings.map((warning: any) => warning.value),
        trailer,
        imdb,
        length,
        country,
        timestamp: fb.firestore.FieldValue.serverTimestamp(),
        type,
      })
      .then(
        () => {
          Swal.fire(
            `${name} added successfully`,
            `You can now watch ${name} on Cinema city`,
            "success"
          );
        },
        (error: any) => {
          Swal.fire(`Error!`, `Error ${error}`, "error");
        }
      );
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-full p-5"
      dir="ltr"
    >
      <div className="container p-5 text-black bg-white border-4 border-black">
        <div className="mb-8 c-gap-wrapper">
          <div className="flex flex-row flex-wrap c-gap-padding c-gap-8">
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-bold">Type</div>
              <div style={{ direction: "ltr" }}>
                <Select
                  options={typeOptions}
                  placeholder="Type"
                  onChange={(e: any) => {
                    setType(e.value ? e.value : "");
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-bold">Country</div>
              <div style={{ direction: "ltr" }}>
                <Select
                  options={countryOptions}
                  placeholder="Country"
                  onChange={(e: any) => {
                    setCountry(e.value ? e.value : "");
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="Movie name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="Image url"
                onChange={(event) => {
                  setImage(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="Year"
                onChange={(event) => {
                  setYear(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-bold">Warnings</div>
              <div style={{ direction: "ltr" }}>
                <MultiSelect
                  labelledBy="Warnings"
                  hasSelectAll={false}
                  options={warningsOptions}
                  value={warnings}
                  onChange={setWarnings}
                  overrideStrings={{
                    selectSomeItems: "Select Movie Warnings",
                    allItemsAreSelected: "All items are selected.",
                    selectAll: "Select All",
                    search: "Search",
                    clearSearch: "Clear Search",
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <TextArea
                label="Descreption"
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextBox
                label="IMDB"
                onChange={(event) => {
                  setImdb(parseInt(event.target.value));
                }}
              />
            </div>
            {type === Type.MOVIE ? (
              <>
                <div className="w-full md:w-1/2">
                  <TextBox
                    label="Length"
                    onChange={(event) => {
                      setLength(parseInt(event.target.value));
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <TextBox
                    label="Video server link"
                    onChange={(event) => {
                      setServerLink(event.target.value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <TextBox
                    label="Download Link"
                    onChange={(event) => {
                      setDownloadLink(event.target.value);
                    }}
                  />
                </div>
              </>
            ) : null}
            <div className="w-full md:w-1/2">
              <TextBox
                label="Trailer Link"
                onChange={(event) => {
                  setTrailer(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-2 font-bold">Categories</div>
              <div style={{ direction: "ltr" }}>
                <MultiSelect
                  labelledBy="Categories"
                  hasSelectAll={false}
                  options={categoriesOptions}
                  value={categories}
                  onChange={setCategories}
                  overrideStrings={{
                    selectSomeItems: "Select Movie categories",
                    allItemsAreSelected: "All items are selected.",
                    selectAll: "Select All",
                    search: "Search",
                    clearSearch: "Clear Search",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            className="p-5 text-white rounded-xl bg-primary ripple-bg-purple-900"
            onClick={addMovie}
          >
            Add movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;

import React, { useState } from "react";
import Swal from "sweetalert2";
import TextArea from "../../components/UI/TextArea";
import TextBox from "../../components/UI/TextBox";
import { db } from "../../firebase";

const AddMovie = () => {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");
  const [serverLink, setServerLink] = useState("");

  const getQueryArray = (query: string) => {
    const querySplited = query.split(" ");
    const queryLength = querySplited.length;
    const arr: string[] = [];

    for (let i = 0; i < queryLength; i++) {
      const currentText = querySplited.join(" ");
      for (let j = 0; j < currentText.length; j++) {
        arr.push(currentText.substr(0, j + 1));
        console.log(currentText.substr(0, j + 1));
      }
      querySplited.shift();
    }

    return arr;
  };

  const addMovie = () => {
    db.collection("movies")
      .add({
        name,
        name_query: getQueryArray(name.toLocaleLowerCase()),
        img,
        year,
        desc,
        server_link: serverLink,
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
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="container p-5 bg-white border-4 border-black">
        <div className="mb-8 c-gap-wrapper">
          <div className="flex flex-row flex-wrap c-gap-padding c-gap-8">
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
              <TextArea
                label="Descreption"
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextArea
                label="Video server link"
                onChange={(event) => {
                  setServerLink(event.target.value);
                }}
              />
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

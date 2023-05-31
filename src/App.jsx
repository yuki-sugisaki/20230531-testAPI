import React, { useState } from "react";

function App() {
  const [isbn, setIsbn] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [volume, setVolume] = useState("");
  const [series, setSeries] = useState("");
  const [author, setAuthor] = useState("");
  const [pubdate, setPubdate] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");

  const handleGetBookInfo = (e) => {
    e.preventDefault();
    const url = `https://api.openbd.jp/v1/get?isbn=${isbn}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data[0] === null) {
          alert("データが見つかりません");
        } else {
          if (data[0].summary.cover === "") {
            setThumbnail("");
          } else {
            setThumbnail(data[0].summary.cover);
          }
          setTitle(data[0].summary.title);
          setPublisher(data[0].summary.publisher);
          setVolume(data[0].summary.volume);
          setSeries(data[0].summary.series);
          setAuthor(data[0].summary.author);
          setPubdate(data[0].summary.pubdate);
          setCover(data[0].summary.cover);
          setDescription(data[0].onix.CollateralDetail.TextContent[0].Text);
        }
      });
  };

  return (
    <div>
      ISBN13：
      <input
        id="isbn"
        type="text"
        name="isbn"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        autoFocus
      />
      <button
        id="getBookInfo"
        className="btn btn-default"
        onClick={handleGetBookInfo}
      >
        書籍情報取得
      </button>
      <div>
        <p id="thumbnail">
          {thumbnail && (
            <img
              src={thumbnail}
              style={{ border: "solid 1px #000000" }}
              alt="thumbnail"
            />
          )}
        </p>
      </div>
      <div>
        書籍名：
        <input id="title" type="text" name="title" value={title} readOnly />
      </div>
      <div>
        出版社：
        <input
          id="publisher"
          type="text"
          name="publisher"
          value={publisher}
          readOnly
        />
      </div>
      <div>
        巻：
        <input id="volume" type="text" name="volume" value={volume} readOnly />
      </div>
      <div>
        シリーズ：
        <input id="series" type="text" name="series" value={series} readOnly />
      </div>
      <div>
        著者：
        <input id="author" type="text" name="author" value={author} readOnly />
      </div>
      <div>
        出版日：
        <input
          id="pubdate"
          type="text"
          name="pubdate"
          value={pubdate}
          readOnly
        />
      </div>
      <div>
        サムネイルURL：
        <input id="cover" type="text" name="cover" value={cover} readOnly />
      </div>
      <div>
        詳細：
        <textarea
          id="description"
          type="text"
          name="description"
          value={description}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;

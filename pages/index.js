import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
    setQuestionInput("");
  }

  return (
    <div>
      <Head>
        <title>Existential Lisa Simpson</title>
      </Head>
      <div className="headerContainer">
        <h1>Existential Lisa Simpson - By James Harvey</h1>
      </div>
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <label>
            <input
              type="text"
              name="question"
              value={questionInput}
              placeholder="Enter your question here"
              onChange={(e) => {
                setQuestionInput(e.target.value);
              }}
            />
            <input type="submit" value={loading ? "Loading..." : "Ask Lisa!"} />
          </label>
        </form>
        <div className="lisaContainer">
          <div>
            <Image
              src="/pngfind.com-lisa-png-1438388.png"
              width={200}
              height={180}
              alt="lisa simspson"
              className={styles.icon}
            />
          </div>

          <div className="box sb1">
            {result ? result : "If anyone has a question, i'll be in my room"}
          </div>
        </div>
      </main>
    </div>
  );
}

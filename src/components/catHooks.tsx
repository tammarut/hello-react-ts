import React, { useState, useEffect } from "react";

import { fetchCatData } from "../services/cat.service";

const useInput = (initialState: any) => {
  const [value, setValue] = useState(initialState);
  const handleInput = (event: any) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleInput,
  };
};

const useCat = (id: number | string) => {
  const [cat, setCat] = useState(Object);
  const [loading, setLoading] = useState(false);

  async function fetch() {
    setLoading(true);
    const catObject = await fetchCatData(id);
    setLoading(false);
    setCat(catObject);
  }

  useEffect(
    function () {
      fetch();
    },
    [id]
  );

  return {
    cat,
    loading,
  };
};

const useWindow = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
};

const Cat = () => {
  const { value: id, onChange } = useInput(0);
  const { value: owner, onChange: onOwnerChange } = useInput("Jame");
  const { cat, loading } = useCat(id);
  const { width, height } = useWindow();

  return (
    <div>
      <section>
        <label>ID: </label>
        <input type="text" value={id} onChange={onChange} />
      </section>
      <section>
        <label>Owner: </label>
        <input type="text" value={owner} onChange={onOwnerChange} />
        <p>⇒ {owner}</p>
      </section>
      {loading ? (
        <div>loading..</div>
      ) : cat.id ? (
        <section>
          <img src={cat.url} />
          <h2>{cat.id}</h2>
          <h3>
            window width: {width} px <br />
            window height: {height}px
          </h3>
        </section>
      ) : (
        <section>No cat!!🥶</section>
      )}
    </div>
  );
};

export default Cat;

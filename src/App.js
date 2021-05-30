import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const YOUR_APP_ID = `b7088fe6`;
  const YOUR_APP_KEY = `8cd22b5f47ff04e13aec444e19e8d19a`;
  const request = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  const getRecipes = async () => {
    const response = await fetch(request);
    const data = await response.json();
    setRecipes(data.hits);
    setIsLoading(false);
  };

  const textHandler = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    getRecipes();
  }, [query]);
  if (isLoading) {
    return (
      <h1 style={{ textAlign: "center", margin: "3rem 0" }}>Loading...</h1>
    );
  }
  return (
    <div className="App">
      <form onSubmit={submitHandler} style={{ margin: "2rem 0" }}>
        <input type="text" value={search} onChange={textHandler} />
        <input type="submit" value="Search" />
      </form>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.recipe.label}>
            <img src={recipe.recipe.image} alt="" />
            <h1>{recipe.recipe.label}</h1>
            <ul>
              {recipe.recipe.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient.text}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;

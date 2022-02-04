import "./App.scss";
import { useEffect, useState } from "react";
import hero from "./assets/hero.png";
import fleche from "./assets/fleche.svg";
import cross from "./assets/cross.svg";
import Modal from "./Modal.js";
import useModal from "./useModal";

import { wines, appellations, colors, types, sweetnessLevels } from "./data.js";

function App() {
  //state definition
  const [appellationFilters, setAppellationFilters] = useState(appellations);
  const [colorFilters, setColorFilters] = useState(colors);
  const [typeFilters, setTypeFilters] = useState(types);
  const [sweetnessLevelFilters, setSweetnessLevelFilters] = useState(
    sweetnessLevels
  );

  const [currentAppellation, setCurrentAppellation] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentSweetnessLevel, setCurrentSweetnessLevel] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  const [currentName, setCurrentName] = useState(null);

  const [canSubmit, setCanSubmit] = useState(false);

  //get valid wine combinations for select options
  function getValidWines() {
    return wines.filter(wine => {
      if (currentAppellation && currentAppellation !== wine.appellationId) {
        return false;
      }
      if (currentColor && currentColor !== wine.colorId) {
        return false;
      }
      if (currentType && currentType !== wine.typeId) {
        return false;
      }
      if (
        currentSweetnessLevel &&
        currentSweetnessLevel !== wine.sweetnessLevelId
      ) {
        return false;
      }
      return true;
    });
  }

  // update the possibilities for the select option
  function updateFilters() {
    const validWines = getValidWines();

    const validAppellations = appellations.filter(appellation => {
      return validWines.find(w => w.appellationId === appellation.id)
        ? true
        : false;
    });

    const validColors = colors.filter(color => {
      return validWines.find(w => w.colorId === color.id) ? true : false;
    });

    const validTypes = types.filter(type => {
      return validWines.find(w => w.typeId === type.id) ? true : false;
    });

    const validSweetnessLevels = sweetnessLevels.filter(sweetnessLevel => {
      return validWines.find(w => w.sweetnessLevelId === sweetnessLevel.id)
        ? true
        : false;
    });

    //set all valid options in each state
    setAppellationFilters(validAppellations);
    setColorFilters(validColors);
    setTypeFilters(validTypes);
    setSweetnessLevelFilters(validSweetnessLevels);
  }

  //watcher to update the select option after each change
  useEffect(() => {
    const formIsFullyFilled =
      currentColor &&
      currentType &&
      currentSweetnessLevel &&
      currentAppellation &&
      currentRank &&
      currentName
        ? true
        : false;
    console.log(currentName, currentRank);
    setCanSubmit(formIsFullyFilled);
    updateFilters();
  });

  //toggle modal / call usemodalfct
  const {
    isShowing: istoggleWineFormShowed,
    toggle: toggleWineForm
  } = useModal();

  return (
    <div className="App">
      <button className="modal-toggle" onClick={toggleWineForm}>
        Ajouter un vin
      </button>

      <Modal isShowing={istoggleWineFormShowed} hide={toggleWineForm}>
        <div className="hero_container">
          <img src={hero} alt="hero"></img>
        </div>
        <h1>Ajouter</h1>
        <div className="text">
          <p>
            <img src={fleche} alt="fleche"></img>
            Ajouter un vin vous permet de renseigner d'une manière très générale
            les informations immuables d'un millésime à l'autre. Vous pourrez
            ensuite ajouter ses millésimes avec un niveau de précision beaucoup
            plus élevé.
          </p>
        </div>
        <form>
          <div className="form_first_row">
            <fieldset>
              <legend htmlFor="name">Nom du vin *</legend>
              <input
                name="wine_name"
                type="text"
                maxLength={25}
                placeholder="Château Latour"
                onChange={e => {
                  setCurrentName(e.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset>
              <legend htmlFor="appellation">Appellation *</legend>
              <select
                name="appellation"
                type="select"
                onChange={e => {
                  setCurrentAppellation(e.target.value);
                }}
              >
                <option value={null}>--Selection de l'appellation--</option>
                {appellationFilters.map((appellation, key) => (
                  <option key={key} value={appellation.id}>
                    {appellation.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentAppellation(null);
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>
          </div>
          <div className="form_second_row">
            <fieldset>
              <legend htmlFor="color">Couleur *</legend>
              <select
                name="color"
                type="select"
                onChange={e => {
                  setCurrentColor(e.target.value);
                }}
              >
                <option value={null}>--Selection de la couleur--</option>
                {colorFilters.map((color, key) => (
                  <option key={key} value={color.id}>
                    {color.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentColor(null);
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>

            <fieldset>
              <legend htmlFor="type">Type *</legend>
              <select
                name="type"
                type="select"
                onChange={e => {
                  setCurrentType(e.target.value);
                }}
              >
                <option value={null}>--Selection du type--</option>

                {typeFilters.map((type, key) => (
                  <option key={key} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentColor(null);
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>

            <fieldset>
              <legend htmlFor="sweetnessLevels">Sucrosité *</legend>
              <select
                name="sweetnessLevels"
                type="select"
                onChange={e => {
                  setCurrentSweetnessLevel(e.target.value);
                }}
              >
                <option value={null}>--Selection de la sucrosité--</option>
                {sweetnessLevelFilters.map((sweetnessLevel, key) => (
                  <option key={key} value={sweetnessLevel.id}>
                    {sweetnessLevel.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentColor(null);
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>
          </div>
          <div className="wine_rank">
            <label htmlFor="rank">Rang du vin *</label>
            <div className="wine_rank_options">
              <div>
                <input
                  type="radio"
                  id="first"
                  name="rank"
                  value={"first"}
                  onClick={e => {
                    setCurrentRank(e.target.value);
                  }}
                ></input>
                <label htmlFor="first">Premier Vin</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="second"
                  name="rank"
                  value={"second"}
                  onClick={e => {
                    setCurrentRank(e.target.value);
                  }}
                ></input>
                <label htmlFor="second">Second Vin</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="rank"
                  value={"other"}
                  onClick={e => {
                    setCurrentRank(e.target.value);
                  }}
                ></input>
                <label htmlFor="other">Autre Vin</label>
              </div>
            </div>
          </div>
          <div className="next_step">
            <span>
              Après cette étape, vous ne pourrez plus modifier ces informations.
            </span>
            <button type="submit" disabled={!canSubmit}>
              Suivant
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;

import './App.scss';
import { useEffect, useState, useRef } from 'react';
import hero from './assets/hero.png';
import fleche from './assets/fleche.svg';
import cross from './assets/cross.svg';
import Modal from './Modal.js';
import useModal from './useModal';

import { wines, appellations, colors, types, sweetnessLevels } from './data.js';

function App() {
  //states
  const [currentAppellations, setAppellations] = useState(appellations);
  const [currentColors, setColors] = useState(colors);
  const [currentTypes, setTypes] = useState(types);
  const [currentSweetnessLevels, setSweetnessLevels] = useState(
    sweetnessLevels
  );
  const [currentWines, setCurrentWines] = useState(wines);
  const [currentRank, setCurrentRank] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [markerAppellation, setMarkerAppellation] = useState(null);
  const [markerColor, setMarkerColor] = useState(null);
  const [markerType, setMarkerType] = useState(null);

  const [canSubmit, setCanSubmit] = useState(false);

  //refs
  const select1 = useRef(null);
  const select2 = useRef(null);
  const select3 = useRef(null);

  // function to update colors on appellation change
  const appellationChange = (e) => {
    const validWines = currentWines.filter(
      (wine) => e.target.value === wine.appellationId
    );
    const validColors = colors.filter((color) => {
      return validWines.find((w) => w.colorId === color.id) ? true : false;
    });

    setMarkerColor(validWines);

    if (validWines.length === 1) {
      uniqueSelector(validWines);
    }
    setColors(validColors);
    setCurrentWines(validWines);
  };

  // function to update type on color change
  const colorChange = (e) => {
    const validWines = currentWines.filter(
      (wine) => e.target.value === wine.colorId
    );

    const validTypes = types.filter((type) => {
      return validWines.find((w) => w.typeId === type.id) ? true : false;
    });

    setMarkerType(validWines);

    if (validWines.length === 1) {
      uniqueSelector(validWines);
    }

    setTypes(validTypes);
    setCurrentWines(validWines);
  };

  // function to update sweetnesslevel on type change

  const typeChange = (e) => {
    const validWines = currentWines.filter(
      (wine) => e.target.value === wine.typeId
    );

    const validSweetnessLevel = sweetnessLevels.filter((sweetnessLevel) => {
      return validWines.find((w) => w.sweetnessLevelId === sweetnessLevel.id)
        ? true
        : false;
    });

    setMarkerAppellation(validWines);

    if (validWines.length === 1) {
      uniqueSelector(validWines);
    }
    setSweetnessLevels(validSweetnessLevel);
    setCurrentWines(validWines);
  };

  // function to update all field when there is only one combination

  const uniqueSelector = (validWines) => {
    const appellationUnique = currentAppellations.filter((appellation) => {
      return validWines.find((w) => w.appellationId === appellation.id)
        ? true
        : false;
    });
    const colorUnique = currentColors.filter((color) => {
      return validWines.find((w) => w.colorId === color.id) ? true : false;
    });
    const typeUnique = currentTypes.filter((type) => {
      return validWines.find((w) => w.typeId === type.id) ? true : false;
    });
    const sweetnessLevelUnique = currentSweetnessLevels.filter(
      (sweetnessLevel) => {
        return validWines.find((w) => w.sweetnessLevelId === sweetnessLevel.id)
          ? true
          : false;
      }
    );
    //use ref to remove unuse option
    select1.current.removeChild(select1.current.children[0]);
    select2.current.removeChild(select2.current.children[0]);
    select3.current.removeChild(select3.current.children[0]);

    setAppellations(appellationUnique);
    setColors(colorUnique);
    setTypes(typeUnique);
    setSweetnessLevels(sweetnessLevelUnique);
  };

  //watcher to update button when form is fully filled
  useEffect(() => {
    const formIsFullyFilled =
      appellations &&
      colors &&
      types &&
      sweetnessLevels &&
      currentRank &&
      currentName
        ? true
        : false;
    setCanSubmit(formIsFullyFilled);
  }, [
    currentAppellations,
    currentColors,
    currentTypes,
    currentSweetnessLevels,
    currentWines,
    currentRank,
    currentName,
  ]);

  //toggle modal / call usemodalfct
  const {
    isShowing: istoggleWineFormShowed,
    toggle: toggleWineForm,
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
                onChange={(e) => {
                  setCurrentName(e.target.value);
                }}
              ></input>
            </fieldset>
            <fieldset>
              <legend htmlFor="appellation">Appellation *</legend>
              <select
                name="appellation"
                type="select"
                onChange={appellationChange}
              >
                <option value={''}>--Selection de l'appellation--</option>
                {appellations.map((appellation, key) => (
                  <option key={key} value={appellation.id}>
                    {appellation.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentWines(wines);
                  setColors(colors);
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
                ref={select1}
                name="color"
                type="select"
                onChange={colorChange}
              >
                <option value={' '}>--Selection de la couleur--</option>
                {currentColors.map((color, key) => (
                  <option key={key} value={color.id}>
                    {color.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentWines(markerAppellation);
                  setTypes(types);
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>

            <fieldset>
              <legend htmlFor="type">Type *</legend>
              <select
                ref={select2}
                name="type"
                type="select"
                onChange={typeChange}
              >
                <option value={' '}>--Selection du type--</option>

                {currentTypes.map((type, key) => (
                  <option key={key} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentWines(markerColor);
                  setCurrentName();
                }}
              >
                <img src={cross} alt="supprimer"></img>
              </div>
            </fieldset>
            <fieldset>
              <legend htmlFor="sweetnessLevels">Sucrosité *</legend>
              <select ref={select3} name="sweetnessLevels" type="select">
                <option value={' '}>--Selection de la sucrosité--</option>
                {currentSweetnessLevels.map((sweetnessLevel, key) => (
                  <option key={key} value={sweetnessLevel.id}>
                    {sweetnessLevel.label}
                  </option>
                ))}
              </select>
              <div
                className="remove"
                onClick={() => {
                  setCurrentWines(markerType);
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
                  value={'first'}
                  onClick={(e) => {
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
                  value={'second'}
                  onClick={(e) => {
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
                  value={'other'}
                  onClick={(e) => {
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

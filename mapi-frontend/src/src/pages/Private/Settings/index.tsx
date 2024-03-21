import { useContext, ChangeEvent } from "react";
import { SettingsContext } from "src/context/settings";
import styles from "./settings.module.css";

const Settings = () => {
  const settingContext = useContext(SettingsContext);
  const { settingsState, setLanguage, setCurrency, setTheme } = settingContext;
  const { translated_text } = settingsState;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value: string = event.target.value;
    const { name } = event.target;
    if (name === "language") setLanguage(value);
    else if (name === "currency") setCurrency(value);
    else if (name === "theme") setTheme(value);
  };

  return (
    <article className={styles.settings}>
      <section>
        <h3>{translated_text.settings}</h3>
        <div>
          <fieldset>
            <label htmlFor="language">{translated_text.select_language}</label>
            <select
              onChange={handleChange}
              value={translated_text.language}
              name="language"
              id="language"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="currency">{translated_text.select_currency}</label>
            <select onChange={handleChange} name="currency" id="currency">
              <option value="USD">{translated_text.dollars}</option>
              <option value="COP">{translated_text.colombian_pesos}</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="theme">{translated_text.select_theme}</label>
            <select onChange={handleChange} name="theme" id="theme">
              <option value="1">{translated_text.light}</option>
              <option value="2">{translated_text.dark}</option>
            </select>
          </fieldset>
        </div>
      </section>
    </article>
  );
};

export default Settings;

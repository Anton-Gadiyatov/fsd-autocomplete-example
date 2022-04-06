import { useEffect, useState } from "react";
import { getAllCountries } from "../../shared/api/countries/countries";
import { Countries, Country } from "../../shared/api/types";
import { AutoCompleteText } from "../../shared/ui/AutoComplete/AutoComplete";

export const AutoCompelteUseState = () => {
  const [items, setItems] = useState<Countries>([]);
  const [suggestionsArray, setSuggestionsArray] = useState<Countries>([]);
  const [text, setText] = useState<Country>("");

  useEffect(() => {
    const getCountriesHelper = async () => {
      const data = await getAllCountries().then((data) => data);
      setItems(data);
    };
    getCountriesHelper();
  });

  const stateHelper = (array: Countries) => {
    setSuggestionsArray(array);
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: Countries = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((item: Country) => regex.test(item));
    }
    setSuggestionsArray(suggestions);
    setText(e.target.value);
  };

  const handleFocus = () => {
    let suggestions: Countries = [];
    if (text.length > 0) {
      const regex = new RegExp(`^${text}`, "i");
      suggestions = items.sort().filter((item: Country) => regex.test(item));
    }
    setSuggestionsArray(suggestions);
  };

  const suggestionSelected = (item: Country) => {
    setText(item);
    setSuggestionsArray([]);
  };

  const handleBlur = () => {
    setSuggestionsArray([]);
  };

  return (
    <AutoCompleteText
      text={text}
      suggestionsArray={suggestionsArray}
      handleBlur={handleBlur}
      stateHelper={stateHelper}
      onTextChanged={onTextChanged}
      handleFocus={handleFocus}
      suggestionSelected={suggestionSelected}
    />
  );
};

import React from "react";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import debounce from "lodash.debounce";

const Seacrh = () => {
  const [value, setValue] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      // console.log(str);
    }, 1000),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const clickEarse = () => {
    // setSearchValue("");
    setValue("");
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };
  // <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
  return (
    <div ref={rootRef} className={styles.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="-2px"
        y="-2px"
        width="23"
        height="23"
        viewBox="0 0 48 48"
        fill="#000"
      >
        <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
      </svg>
      <input
        ref={inputRef}
        onChange={(event) => onChangeInput(event)}
        value={value}
        placeholder="Поиск пицц ..."
        onFocus={() => {
          rootRef.current?.setAttribute(
            "style",
            "border: 2px solid rgba(0, 0, 0, 0.6);"
          );
        }}
        onBlur={() =>
          rootRef.current?.setAttribute(
            "style",
            "border: 2px solid rgba(0, 0, 0, 0.2);"
          )
        }
      />
      {value && (
        <svg
          onClick={() => clickEarse()}
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
        </svg>
      )}
    </div>
  );
};

export default Seacrh;

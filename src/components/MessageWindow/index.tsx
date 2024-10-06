import React from "react";
import styles from "./MessageWindow.module.scss";

const MessageWindow = ({
  title1,
  title2,
}: {
  title1: string | undefined;
  title2: string | undefined;
}) => {
  return (
    <div className={styles.wrapper}>
      <h1>{title1}</h1>
      <br />
      <h2> {title2}</h2>
    </div>
  );
};

export default MessageWindow;

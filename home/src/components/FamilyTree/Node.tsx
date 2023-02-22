import classNames from "classnames";
import { IoPerson } from "react-icons/io5";
import styles from "../../styles/tree.module.css";
/* ------------------------------- Node Person ------------------------------ */

export function Node({ name, type }: { name: string; type: string }) {
  return (
    <div className={styles.node}>
      <div className={styles.box}>
        <div className={classNames(styles.burble, styles[type])}>
          <IoPerson />
        </div>
        <span className={styles.pronoun}>{name}</span>
      </div>
    </div>
  );
}

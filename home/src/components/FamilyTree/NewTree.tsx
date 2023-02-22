import React, { PropsWithChildren } from "react";
import styles from "../../styles/Familytree.module.css";

/* ----------------------- Third Family Tree Component ---------------------- */

interface ChildProps {
  name: string;
}

interface ParentProps {
  paternal: PersonProps;
  maternal: PersonProps;
  child?: ChildProps[];
}

interface PersonProps {
  name: string;
  parent?: ParentProps;
  isPerson?: boolean;
}
export const NewTree: React.FC<ParentProps> = (parent) => {
  const renderNode = (parent: any) => {
    return (
      <div className={styles.newNode}>
        <div className={styles.newParentNode}>
          {parent.paternal?.parent && (
            <div className={styles.newNode}>
              {renderNode(parent.paternal.parent)}
            </div>
          )}
          {parent.maternal?.parent && (
            <div className={styles.newNode}>
              {renderNode(parent.maternal.parent)}
            </div>
          )}
        </div>
        <div className={styles.newNode}>
          <MyTreeNode parent={parent} />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      {renderNode(parent)}
      {parent.child && (
        <div className={styles.newNode}>
      <div className={styles.child}>
          <Children child={parent.child} />
      </div>
        </div>
      )}
    </div>
  );
};

export default function MyTreeNode({
  parent,
  children,
}: PropsWithChildren<any>) {
  return (
    <div className={styles.parent}>
      <div className={styles.children}>
        {parent.maternal?.parent?.child && (
          <Children child={parent.maternal?.parent?.child} />
        )}
        {parent.maternal && (
          <Node
            name={parent.maternal.name}
            type={parent.maternal.isPerson ? "patient" : "family"}
          />
        )}
        <Node
          name={parent.paternal.name}
          type={parent.paternal.isPerson ? "patient" : "family"}
        />
        {parent.paternal?.parent?.child && (
          <Children child={parent.paternal?.parent?.child} />
        )}
      </div>
      {children}
    </div>
  );
}

const Children = ({ child }: any) => {
  return (
    <>
      {child &&
        child.map((child: any, index: number) => (
          <Node key={index} name={child.name} type="sick" />
        ))}
    </>
  );
};

export const newFamilyTree: ParentProps = {
  paternal: {
    name: "Yo",
    parent: {
      paternal: {
        name: "Padre",
        parent: {
          paternal: {
            name: "Abuelo Paterno",
          },
          maternal: {
            name: "Abuela Paterna",
          },
          child: [
            {
              name: "Tia",
            },
          ],
        },
      },
      maternal: {
        name: "Madre",
        parent: {
          paternal: {
            name: "Abuelo Materno",
          },
          maternal: {
            name: "Abuela Materna",
          },
          child: [
            {
              name: "Tio",
            },
          ],
        },
      },
      child: [],
    },
    isPerson: true,
  },
  maternal: {
    name: "Esposa",
  },
  child: [
    {
      name: "Hijo",
    },
    {
      name: "Hija",
    },

  ],
};

import classNames from "classnames";
import { IoPerson } from "react-icons/io5";
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

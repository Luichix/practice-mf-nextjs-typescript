import React, { PropsWithChildren, useState } from 'react';
import { Node } from './Node';
import styles from '../../styles/tree.module.css';

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

export const MyTree: React.FC<ParentProps> = (parent) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className={styles.myNode}>
        {parent.paternal.parent?.maternal.parent && (
          <MyTreeNode parent={parent.paternal.parent?.maternal.parent} />
        )}
        {parent.paternal.parent?.paternal.parent && (
          <MyTreeNode parent={parent.paternal.parent?.paternal.parent} />
        )}
      </div>
      <div className={styles.myNode}>
        {parent.paternal.parent && (
          <MyTreeNode parent={parent.paternal.parent} />
        )}
        {parent.maternal.parent && (
          <MyTreeNode parent={parent.maternal.parent} />
        )}
      </div>
      <div className={styles.myNode}>
        <MyTreeNode parent={parent} />
      </div>
      <div className={styles.myNode}>
        <MyChildNode child={parent.child} />
      </div>
    </div>
  );
};

export default function MyTreeNode({
  parent,
  children,
}: PropsWithChildren<any>) {
  return (
    <div className={styles.parent}>
      <div className={styles.parentNode}>
        {parent.maternal?.parent?.child && (
          <MyChildNode child={parent.maternal?.parent?.child} />
        )}
        {parent.maternal && (
          <Node
            name={parent.maternal.name}
            type={parent.maternal.isPerson ? 'patient' : 'family'}
          />
        )}
        <Node
          name={parent.paternal.name}
          type={parent.paternal.isPerson ? 'patient' : 'family'}
        />
        {parent.paternal?.parent?.child && (
          <MyChildNode child={parent.paternal?.parent?.child} />
        )}
      </div>
      {children}
    </div>
  );
}

const MyChildNode = ({ child }: any) => {
  return (
    <div className={styles.children}>
      {child &&
        child.map((child: any, index: number) => (
          <React.Fragment key={index}>
            <MyChild name={child.name} />
          </React.Fragment>
        ))}
    </div>
  );
};

const MyChild = ({ name }: { name: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Node name={name} type={'family'} />
    </div>
  );
};

export const myFamilyTree: ParentProps = {
  paternal: {
    name: 'Yo',
    parent: {
      paternal: {
        name: 'Padre',
        parent: {
          paternal: {
            name: 'Abuelo Paterno',
          },
          maternal: {
            name: 'Abuela Paterna',
          },
          child: [
            {
              name: 'Tia',
            },
          ],
        },
      },
      maternal: {
        name: 'Madre',
        parent: {
          paternal: {
            name: 'Abuelo Materno',
          },
          maternal: {
            name: 'Abuela Materna',
          },
          child: [
            {
              name: 'Tio',
            },
          ],
        },
      },
      child: [
        {
          name: 'Hermano',
        },
      ],
    },
    isPerson: true,
  },
  maternal: {
    name: 'Esposa',
  },
  child: [
    {
      name: 'Hijo',
    },
    {
      name: 'Hija',
    },
  ],
};

import React, { useState } from 'react';
import { Node } from './Node';
import styles from '../../styles/tree.module.css';

export function NextTree({ family }: any) {
  return (
    <div className={styles.pronoun}>
      NextTree
      {family}
    </div>
  );
}

export const nextFamily = {};

interface ChildProps {
  name: string;
  disease: string;
  description: string;
  id: string;
}

interface ParentProps {
  paternal: PersonProps;
  maternal: PersonProps;
  child?: ChildProps[];
}

interface PersonProps {
  hierarchy?: ParentProps;
  patient?: boolean;
  name: string;
  disease: string;
  description: string;
  id: string;
}

type NewParentProps = PersonProps[];

interface NewParentProp {
  paternal: PersonProps;
  maternal: PersonProps;
  child?: PersonProps[];
}

const object = [
  {
    hierarchy: '',
    name: '',
    disease: '',
    patient: false,
    description: '',
    id: 'caf34d8d-338b-40f6-aae0-452eca9bf47d',
  },
];

const newFamilyTree = {
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

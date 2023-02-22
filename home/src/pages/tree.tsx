import React, { PropsWithChildren, useState } from 'react';
import styles from '../styles/tree.module.css';
import {
  Node,
  myFamilyTree,
  MyTree,
  family,
  FamilyTree,
  NextTree,
  nextFamily,
  newFamilyTree,
  NewTree,
} from '@/components/FamilyTree';

/* -------------------------------- App Tree -------------------------------- */

export default function Tree() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '100px',
        gap: '20px',
        flexDirection: 'column',
        backgroundColor: '#444',
        color: '#eee',
      }}
    >
      <h1>Family Tree</h1>
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>
          0° Node Tree Component
        </h3>
        <Node name="Family" type="patient" />
      </div>
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>
          1° Family Tree Component
        </h3>
        <FamilyTree family={family} />
      </div>
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>
          2° Family Tree Component
        </h3>
        <MyTree {...myFamilyTree} />
      </div>
  
      <div className={styles.div}>
        <h3 style={{ alignSelf: 'flex-start', color: '#666' }}>
          3° Family Tree Component
        </h3>
        <NewTree {...newFamilyTree} />
      </div>
    </div>
  );
}

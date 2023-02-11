import React, { useState } from 'react';
import { Node } from './Node';
import styles from '../../styles/tree.module.css';

/* ---------------------- First Family Tree Component  --------------------- */

export const family = [
  {
    node: { name: 'Abuelo' },
    she: 'Abuela',
    children: [
      { node: { name: 'Tio' }, children: [] },
      { node: { name: 'Tia' }, children: [] },
      {
        node: { name: 'Padre' },
        she: 'Madre',
        children: [
          {
            node: { name: 'Paciente', patient: true },
            she: 'Esposa',
            children: [
              {
                node: { name: 'Hijo' },
                children: [],
              },
              {
                node: { name: 'Hija' },
                children: [],
              },
            ],
          },
          {
            node: { name: 'Hermano' },
            children: [],
          },
        ],
      },
      {
        node: { name: 'Tío' },
        children: [
          {
            node: { name: 'Primo' },
            children: [],
          },
        ],
      },
    ],
  },
];

export function FamilyTree({ family }: any) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {family.map((node: any, index: number) => (
        <FamilyTreeNode
          key={index}
          name={node.node.name}
          she={node.she}
          children={node.children}
        />
      ))}
    </div>
  );
}

function FamilyTreeNode({ name, she, patient = false, children }: any) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.node}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {she && <Node name={she} type="family" />}
          {name && <Node name={name} type={patient ? 'patient' : 'family'} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          {isExpanded &&
            children.map((child: any, index: number) => (
              <React.Fragment key={index}>
                {/* <div className={styles.line} /> */}
                <FamilyTreeNode
                  name={child.node.name}
                  she={child.she}
                  children={child.children}
                  patient={child.node?.patient}
                />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

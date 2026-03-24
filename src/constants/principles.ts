export type Principle = {
  id: string;
  number: number;
  name: string;
  description: string;
  action: (play: boolean, e?: React.MouseEvent) => void;
};

export const PRINCIPLES_DATA: Record<number, Omit<Principle, 'action'>> = {
  1: { id: 'p1', number: 1, name: '1. Squash & Stretch', description: 'Button tap elasticity' },
  2: { id: 'p2', number: 2, name: '2. Anticipation', description: 'Hovering a task row' },
  3: { id: 'p3', number: 3, name: '3. Staging', description: 'Modal background dimming' },
  4: { id: 'p4', number: 4, name: '4. Straight Ahead vs Pose', description: 'Loading spinner style' },
  5: { id: 'p5', number: 5, name: '5. Follow Through', description: 'Hover wave effect' },
  6: { id: 'p6', number: 6, name: '6. Slow In & Slow Out', description: 'Sidebar expansion easing' },
  7: { id: 'p7', number: 7, name: '7. Arcs', description: 'Notification dot trajectory' },
  8: { id: 'p8', number: 8, name: '8. Secondary Action', description: 'Arrow on button hover' },
  9: { id: 'p9', number: 9, name: '9. Timing', description: 'Toast notification speed' },
  10: { id: 'p10', number: 10, name: '10. Exaggeration', description: 'Success checkmark bounce' },
  11: { id: 'p11', number: 11, name: '11. Solid Drawing', description: '3D tilt on Pro card' },
  12: { id: 'p12', number: 12, name: '12. Appeal', description: 'Heart like interaction' }
};

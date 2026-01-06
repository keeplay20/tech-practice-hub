import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Cell as CellType } from '../types/sudoku';

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  onPress: () => void;
  size: number;
}

export default function Cell({ cell, isSelected, onPress, size }: CellProps) {
  const getCellStyle = () => {
    const styles = [cellStyles.cell, { width: size, height: size }];
    
    if (isSelected) {
      styles.push(cellStyles.selected);
    }
    
    if (!cell.isValid && cell.value !== null) {
      styles.push(cellStyles.invalid);
    }
    
    return styles;
  };

  const getTextStyle = () => {
    const styles = [cellStyles.text];
    
    if (cell.isFixed) {
      styles.push(cellStyles.fixedText);
    } else {
      styles.push(cellStyles.userText);
    }
    
    if (!cell.isValid && cell.value !== null) {
      styles.push(cellStyles.invalidText);
    }
    
    return styles;
  };

  return (
    <Pressable
      style={getCellStyle()}
      onPress={onPress}
      disabled={cell.isFixed}
    >
      <Text style={getTextStyle()}>
        {cell.value || ''}
      </Text>
    </Pressable>
  );
}

const cellStyles = StyleSheet.create({
  cell: {
    borderWidth: 0.5,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: '#bbdefb',
  },
  invalid: {
    backgroundColor: '#ffebee',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  fixedText: {
    color: '#000',
    fontWeight: 'bold',
  },
  userText: {
    color: '#2196f3',
  },
  invalidText: {
    color: '#f44336',
  },
});


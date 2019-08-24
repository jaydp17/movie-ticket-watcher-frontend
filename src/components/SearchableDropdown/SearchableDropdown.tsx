import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DownshiftComponent, { DownshiftInterface } from 'downshift';
import React from 'react';
import ScrollablePaper from '../shared/ScrollablePaper';

interface Props<T> {
  label: string;
  items: T[];
  itemToString: (item: T | null) => string;
  initialSelectedItem?: T;
  onChange: (selectedID: string | null) => void;
  getFilterFn: (inputValue: string | null) => (item: T) => boolean;
  isLoading?: boolean;
}
function SearchableDropdown<T extends { id: string }>({
  label,
  items,
  itemToString,
  initialSelectedItem,
  onChange,
  getFilterFn,
  isLoading = false,
}: Props<T>) {
  const Downshift = DownshiftComponent as DownshiftInterface<T>;
  return (
    <Downshift
      onChange={selection => onChange(selection && selection.id)}
      initialSelectedItem={initialSelectedItem}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        openMenu,
        selectedItem,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({ onFocus: openMenu });
        const filterFn = getFilterFn(inputValue);
        return (
          <div>
            <div>
              {renderInput({
                fullWidth: true,
                label,
                disabled: isLoading,
                InputLabelProps: getLabelProps(),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}
            </div>
            <ScrollablePaper {...getMenuProps()}>
              {isOpen
                ? items.filter(filterFn).map((item, index) =>
                    renderItem({
                      item,
                      highlightedIndex,
                      index,
                      selectedItem,
                      itemProps: getItemProps({ item }),
                      itemToString,
                    }),
                  )
                : null}
            </ScrollablePaper>
          </div>
        );
      }}
    </Downshift>
  );
}

interface SuggestionProps<T> {
  highlightedIndex: null | number;
  index: number;
  itemProps: object;
  selectedItem: T | null;
  item: T;
  itemToString: (item: T | null) => string;
}
function renderItem<T extends { id: string }>(suggestionProps: SuggestionProps<T>) {
  const { item, index, itemProps, highlightedIndex, selectedItem, itemToString } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem && selectedItem.id === item.id;

  return (
    <MenuItem
      {...itemProps}
      key={item.id}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      {itemToString(item)}
    </MenuItem>
  );
}

function renderInput(inputProps: any) {
  const { InputProps, classes, ref, InputLabelProps, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      {...other}
    />
  );
}

export default SearchableDropdown;

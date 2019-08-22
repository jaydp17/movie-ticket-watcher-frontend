import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DownshiftComponent, { DownshiftInterface } from 'downshift';
import React, { useState } from 'react';
import ScrollablePaper from '../shared/ScrollablePaper';
import { ICinema } from './types';
import useCinemas from './useCinemas';

function getDownShift<T>() {
  return DownshiftComponent as DownshiftInterface<T>;
}

const Downshift = getDownShift<ICinema>();

interface Props {
  cityID: string;
  selectCinema: (cinemaID: string) => void;
}
function CinemaSelector({ cityID, selectCinema }: Props) {
  const [cinemas, isLoading] = useCinemas(cityID);
  const [cinemaID, setCinema] = useState();

  const onCinemaChange = (selectedID: string | null) => {
    if (!selectedID) return;
    setCinema(selectedID);
    selectCinema(selectedID);
  };

  return (
    <Downshift
      onChange={selection => onCinemaChange(selection && selection.id)}
      itemToString={item => (item == null ? '' : item.name)}
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
        return (
          <div>
            <div>
              {renderInput({
                fullWidth: true,
                label: 'Cinema',
                InputLabelProps: getLabelProps(),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}
            </div>
            <ScrollablePaper {...getMenuProps()}>
              {isOpen
                ? cinemas
                    .filter(
                      cinema =>
                        !inputValue || cinema.name.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                    .map((cinema, index) =>
                      renderCinemaItem({
                        cinema: cinema,
                        highlightedIndex,
                        index,
                        selectedItem,
                        itemProps: getItemProps({ item: cinema }),
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

interface CinemaItemProps {
  highlightedIndex: null | number;
  index: number;
  itemProps: object;
  selectedItem: ICinema | null;
  cinema: ICinema;
}
function renderCinemaItem(cinemaItemProps: CinemaItemProps) {
  const { cinema, index, itemProps, highlightedIndex, selectedItem } = cinemaItemProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem && selectedItem.id === cinema.id;

  return (
    <MenuItem
      {...itemProps}
      key={cinema.id}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      {cinema.name}
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

export default CinemaSelector;

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DownshiftComponent, { DownshiftInterface } from 'downshift';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ICity } from './types';
import useCities from './useCities';

function getDownShift<T>() {
  return DownshiftComponent as DownshiftInterface<T>;
}

const Downshift = getDownShift<ICity>();

const ScrollablePaper = styled(Paper)`
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

interface Props {
  selectCity: (cityID: string) => void;
}
function CitySelector({ selectCity }: Props) {
  const [cities, isLoading] = useCities();
  const [cityID, setCityID] = useState('BANG');

  if (isLoading) return <p>loading...</p>;

  const onCityChange = (selectedID: string | null) => {
    if (!selectedID) return;
    setCityID(selectedID);
    selectCity(selectedID);
  };

  return (
    <Downshift
      onChange={selection => onCityChange(selection && selection.id)}
      initialSelectedItem={{ id: 'BANG', name: 'Bengaluru', isTopCity: true }}
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
                label: 'City',
                InputLabelProps: getLabelProps(),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
              })}
            </div>
            <ScrollablePaper {...getMenuProps()}>
              {isOpen
                ? cities
                    .filter(city =>
                      inputValue
                        ? city.name.toLowerCase().includes(inputValue.toLowerCase())
                        : city.isTopCity,
                    )
                    .map((city, index) =>
                      renderCityItem({
                        city,
                        highlightedIndex,
                        index,
                        selectedItem,
                        itemProps: getItemProps({ item: city }),
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

interface CityItemProps {
  highlightedIndex: null | number;
  index: number;
  itemProps: object;
  selectedItem: ICity | null;
  city: ICity;
}
function renderCityItem(cityItemProps: CityItemProps) {
  const { city, index, itemProps, highlightedIndex, selectedItem } = cityItemProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem && selectedItem.id === city.id;

  return (
    <MenuItem
      {...itemProps}
      key={city.id}
      selected={isHighlighted}
      component="div"
      style={{ fontWeight: isSelected ? 500 : 400 }}
    >
      {city.name}
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

export default CitySelector;

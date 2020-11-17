import React from 'react';
import { connect } from 'react-redux';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import parseLocation from '../utils/parseLocation';

const Search = props => {
  const { user, userType, panTo } = props;
  const userLocation =
    userType === 'diner'
      ? parseLocation(user.currentLocation)
      : parseLocation('43.6034958,-110.7363361');

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => userLocation.lat, lng: () => userLocation.lng },
      radius: 200 * 1000,
    },
  });

  return (
    <div className='search'>
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter an address.'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(suggestion => (
                <ComboboxOption
                  key={suggestion.id}
                  value={suggestion.description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    userType: state.userType,
  };
};

export default connect(mapStateToProps, {})(Search);

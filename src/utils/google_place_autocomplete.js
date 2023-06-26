const useGooglePlaceAutoComplete = () => {

    const initAutoComplete = async (input, callback) => {
        const autoComplete =
            new window.google.maps.places.Autocomplete(input,
                {
                    // limit to North America for now
                    componentRestrictions: { country: ["ke", "ug", "tz"] },
                    fields: ["address_component", "geometry"],
                    types: ["address"]
                }
            );
        autoComplete.addListener("place_changed", callback);

        return autoComplete;

    };

    const getFullAddress = async (autoComplete) => {
        const place = autoComplete.getPlace();
        let address1 = '';
        let locality = '';
        let adminArea1Short = '';
        let adminArea1Long = '';
        let postalCode = '';
        let countryShort = '';
        let countryLong = '';
      
        place.address_components.forEach((component) => {
          const componentType = component.types[0];
      
          if (componentType === 'street_number') {
            address1 = component.long_name;
          }
          if (componentType === 'route') {
            address1 = `${address1} ${component.long_name}`;
          }
          if (componentType === 'locality') {
            locality = component.long_name;
          }
          if (componentType === 'administrative_area_level_1') {
            adminArea1Short = component.short_name;
            adminArea1Long = component.long_name;
          }
          if (componentType === 'postal_code') {
            postalCode = component.long_name;
          }
          if (componentType === 'postal_code_suffix') {
            postalCode = `${postalCode}-${component.long_name}`;
          }
          if (componentType === 'country') {
            countryShort = component.short_name;
            countryLong = component.long_name;
          }
        });
      
        const resAddress = {
          address1,
          locality,
          adminArea1Short,
          adminArea1Long,
          postalCode,
          countryShort,
          countryLong,
        };
      
        return resAddress;
      };
      
      

    return {
        initAutoComplete,
        getFullAddress
    };

};

export default useGooglePlaceAutoComplete;
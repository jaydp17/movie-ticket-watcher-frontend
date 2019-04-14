import React, { useState } from 'react';

function Form({ regions, cinemas }) {
  const [regionCode, setRegionCode] = useState('BANG');
  return (
    <form>
      <fieldset>
        <legend>Region Code</legend>
        <select name="regionCode" value={regionCode} onChange={e => setRegionCode(e.target.value)}>
          {regions.map(r => (
            <option key={r.code} value={r.code}>
              {r.name}
            </option>
          ))}
        </select>
      </fieldset>

      {/* <fieldset>
        <legend>Cinemas</legend>
        <select name="cinemaCode">
          {cinemas.map(c => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </fieldset> */}
    </form>
  );
}

export default Form;

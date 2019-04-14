import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query } from 'react-apollo';

const GET_MOVIES_AND_CINEMAS = gql`
  query MoviesAndCinemas($regionCode: String!) {
    movies(regionCode: $regionCode) {
      code
      name
    }
    cinemas(regionCode: $regionCode) {
      code
      name
    }
  }
`;

function Form({ regions }) {
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

      <Query query={GET_MOVIES_AND_CINEMAS} variables={{ regionCode }}>
        {({ loading, error, data }) => (
          <>
            <fieldset>
              <legend>Movies</legend>
              {loading && <p>loading...</p>}
              {!loading && data && (
                <select name="cinemaCode">
                  {data.movies.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </fieldset>

            <fieldset>
              <legend>Cinemas</legend>
              {loading && <p>loading...</p>}
              {!loading && data && (
                <select name="cinemaCode">
                  {data.cinemas.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </fieldset>
          </>
        )}
      </Query>
    </form>
  );
}

export default Form;

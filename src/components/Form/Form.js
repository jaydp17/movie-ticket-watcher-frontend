import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { getPushSubscription } from '../../utils/notifications';

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

const SUBSCRIBE_TO_MOVIE = gql`
  mutation SubscribeToMovie($regionCode: String!, $movieCode: String!, $cinemaCode: String!, $subscription: PushSubscriptionInput!) {
    subscribeMovieAtCinema(
      regionCode: $regionCode,
      movieCode: $movieCode,
      cinemaCode: $cinemaCode,
      subscription: $subscription
    )
  }
`;

function Form({ regions, subscribeMovie }) {
  const [regionCode, setRegionCode] = useState('BANG');
  const [movieCode, setMovieCode] = useState();
  const [cinemaCode, setCinemaCode] = useState();
  return (
    <Mutation mutation={SUBSCRIBE_TO_MOVIE}>
      {(subscribeMovieAtCinema, { loading: subscribeLoading, error: subscribeError }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const subscription = await getPushSubscription();
            subscribeMovieAtCinema({
              variables: { regionCode, movieCode, cinemaCode, subscription },
            });
          }}
        >
          <fieldset>
            <legend>Region Code</legend>
            <select
              name="regionCode"
              value={regionCode}
              onChange={e => setRegionCode(e.target.value)}
            >
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
                    <select
                      name="movieCode"
                      value={movieCode}
                      onChange={e => setMovieCode(e.target.value)}
                    >
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
                    <select
                      name="cinemaCode"
                      value={cinemaCode}
                      onChange={e => setCinemaCode(e.target.value)}
                    >
                      {data.cinemas.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  )}
                </fieldset>

                <button disabled={!regionCode || !movieCode || !cinemaCode} type="submit">
                  Submit
                </button>
                {subscribeLoading ? 'loading....' : ''}
                {subscribeError ? <pre>{JSON.stringify(subscribeError)}</pre> : ''}
              </>
            )}
          </Query>
        </form>
      )}
    </Mutation>
  );
}

export default Form;

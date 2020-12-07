import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './movies-list.scss';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

	return <div className="movies-list">
		<div className="filter">
			<VisibilityFilterInput visibilityFilter={visibilityFilter}/>
		</div>
		<div className="list">
			{filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
		</div>
	</div>;
}

const mapStateToProps = state => {
	return state
};

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
	movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired
	}),
	visibilityFilter: propTypes.string.isRequired 
};
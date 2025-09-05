
/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} overview
 * @property {string|null} poster_path
 * @property {string|null} backdrop_path
 * @property {string} release_date
 * @property {number} vote_average
 * @property {number} vote_count
 * @property {number[]} genre_ids
 * @property {boolean} adult
 * @property {string} original_language
 * @property {string} original_title
 * @property {number} popularity
 * @property {boolean} video
 */

/**
 * @typedef {Object} MovieDetails
 * @property {Genre[]} genres
 * @property {number|null} runtime
 * @property {number} budget
 * @property {number} revenue
 * @property {string} status
 * @property {string|null} tagline
 * @property {string|null} homepage
 * @property {string|null} imdb_id
 * @property {ProductionCompany[]} production_companies
 * @property {ProductionCountry[]} production_countries
 * @property {SpokenLanguage[]} spoken_languages
 * @property {Credits} [credits]
 * @property {Videos} [videos]
 * @property {ReleaseDates} [release_dates]
 */

/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} ProductionCompany
 * @property {number} id
 * @property {string|null} logo_path
 * @property {string} name
 * @property {string} origin_country
 */

/**
 * @typedef {Object} ProductionCountry
 * @property {string} iso_3166_1
 * @property {string} name
 */

/**
 * @typedef {Object} SpokenLanguage
 * @property {string} english_name
 * @property {string} iso_639_1
 * @property {string} name
 */

/**
 * @typedef {Object} Credits
 * @property {CastMember[]} cast
 * @property {CrewMember[]} crew
 */

/**
 * @typedef {Object} CastMember
 * @property {number} id
 * @property {string} name
 * @property {string} character
 * @property {string|null} profile_path
 * @property {number} order
 */

/**
 * @typedef {Object} CrewMember
 * @property {number} id
 * @property {string} name
 * @property {string} job
 * @property {string} department
 * @property {string|null} profile_path
 */

/**
 * @typedef {Object} Videos
 * @property {Video[]} results
 */

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} key
 * @property {string} name
 * @property {string} site
 * @property {string} type
 * @property {boolean} official
 * @property {string} published_at
 */

/**
 * @typedef {Object} ReleaseDates
 * @property {ReleaseDate[]} results
 */

/**
 * @typedef {Object} ReleaseDate
 * @property {string} iso_3166_1
 * @property {Object[]} release_dates
 * @property {string} release_dates.certification
 * @property {string[]} release_dates.descriptors
 * @property {string|null} release_dates.iso_639_1
 * @property {string|null} release_dates.note
 * @property {string} release_dates.release_date
 * @property {number} release_dates.type
 */

/**
 * @typedef {Object} TMDBResponse
 * @property {number} page
 * @property {Object[]} results
 * @property {number} total_pages
 * @property {number} total_results
 */

/**
 * @typedef {Object} SearchParams
 * @property {string} [query]
 * @property {number} [page]
 */

// Exportações para uso em outros arquivos
export const MovieTypes = {
  // Este objeto serve apenas como marcador para indicar que os tipos estão disponíveis
  name: 'MovieTypes'
}

// Funções utilitárias para verificação de tipos (opcional)
export const isMovie = (obj) => {
  return obj && typeof obj.id === 'number' && typeof obj.title === 'string'
}

export const isMovieDetails = (obj) => {
  return isMovie(obj) && Array.isArray(obj.genres)
}
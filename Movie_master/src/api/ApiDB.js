import { API_KEY, SITE_URL, IMAGE_URL } from '@env';
import axios from 'axios';

//movies endpoint

const trendingMoviesEndpoint = `${SITE_URL}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${SITE_URL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndpoint = `${SITE_URL}/movie/top_rated?api_key=${API_KEY}`;


const movieDetailsEndpoint = id => `${SITE_URL}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = id => `${SITE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id => `${SITE_URL}/movie/${id}/similar?api_key=${API_KEY}`;

//tv endpoint

const arranginhTvEndpoint = `${SITE_URL}/tv/airing_today?api_key=${API_KEY}`;
const ontheairTvEndpoint = `${SITE_URL}/tv/on_the_air?api_key=${API_KEY}`;
const popularTvEndpoint = `${SITE_URL}/tv/popular?api_key=${API_KEY}`;
const topratedTvEndpoint = `${SITE_URL}/tv/top_rated?api_key=${API_KEY}`;


//Search endpoint

const searchMoviesEndpoint = `${SITE_URL}/search/movie?api_key=${API_KEY}`;


// functions to get images of different widths
export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;


const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}

// movie screen apis

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesEndpoint);
}

// movie screen apis
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}

// search screen apis

export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}


// tv screen apis

export const fetchArrangingTv = ()=>{
    return apiCall(arranginhTvEndpoint);
}
export const fetchOntheairTv = ()=>{
    return apiCall(ontheairTvEndpoint);
}
export const fetchPopularTv = ()=>{
    return apiCall(popularTvEndpoint);
}

export const fetchTopratedTv = ()=>{
    return apiCall(topratedTvEndpoint);
}



// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

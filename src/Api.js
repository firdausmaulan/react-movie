import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
export const baseImageUrl = process.env.REACT_APP_IMAGE_URL
const apiKey = process.env.REACT_APP_API_KEY

export const searchMovies = async(query, page) => {
    const moviesResponse = await axios.get(
        `${baseUrl}/search/movie`, 
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            params: {
                'query' : query,
                'page' : page,
            }
        }
    )
    return moviesResponse.data
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const fetchWeather = async (lat, lon) => {
    const url = new URL(BASE_URL + "/weather")
    url.search = new URLSearchParams({ lat: lat, lon: lon, lang: "en", appid: API_KEY, units: "metric" })
    //console.log(url.href)

    const { data } = await axios.get(url.href);
    return data;
};

export const useWeatherData = (lat, lon) => {
    return useQuery({
        queryKey: ['weatherData', lat, lon],
        queryFn: () => fetchWeather(lat, lon),
        refetchOnWindowFocus: false
    });
}

//Air pollution API
//http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
const fetchAirPollution = async (lat, lon) => {
    const url = new URL(BASE_URL + "/air_pollution")
    url.search = new URLSearchParams({ lat: lat, lon: lon, appid: API_KEY })
    //console.log(url.href)

    const response = await axios.get(url.href)
    return response.data;
}

export const useAirPollution = (lat, lon) => {
    return useQuery({
        queryKey: ["airpollution-data", lat, lon],
        queryFn: () => fetchAirPollution(lat, lon),
        refetchOnWindowFocus: false,
        enabled: !!lat,
    })
}
//api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}
const fetchForecast = async (lat, lon) => {
    const url = new URL(BASE_URL + "/forecast")
    url.search = new URLSearchParams({ lat: lat, lon: lon, appid: API_KEY, units: "metric" })
    //console.log(url.href)

    const { data } = await axios.get(url.href);
    return data;
};

export const useForecast = (lat, lon) => {
    return useQuery({
        queryKey: ["forecast-data", lat, lon],
        queryFn: () => fetchForecast(lat, lon),
        refetchOnWindowFocus: false,
        enabled: !!lat,
    })
}
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
const fetchCitys = async (searchParams) => {
    const url = new URL("http://api.openweathermap.org/geo/1.0/direct")
    url.search = new URLSearchParams({ q: searchParams, limit: 5, appid: API_KEY })
    //console.log(url.href)

    const { data } = await axios.get(url.href);
    return data;
};

export const useCityData = (searchParams) => {
    return useQuery({
        queryKey: ['cityData', searchParams],
        queryFn: () => fetchCitys(searchParams),
        refetchOnWindowFocus: false,
        enabled: false, // Disable the initial fetch , Disable automatic refetch on mount
    });
}
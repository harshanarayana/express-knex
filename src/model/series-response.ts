interface SeriesMetadata {
    name: string;
    license: string;
    website: string;
    page: number;
    limit: number;
    found: number;
}

interface DateType {
    utc: string;
    local: string;
}

interface Coordinate {
    latitude: number;
    longitude: number;
}

interface ResultData {
    location: string;
    parameter: string;
    date: DateType;
    value: number;
    unit: string;
    coordinates: Coordinate;
    country: string;
    city: string;
}

export default interface SeriesResponse {
    meta: SeriesMetadata;
    results: ResultData[];
}
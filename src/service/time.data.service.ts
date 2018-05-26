import * as rm from "typed-rest-client/RestClient";
import SeriesResponse from "../model/series-response";


export const getTimeSeriesData = async (): Promise<SeriesResponse> => {

    const client: rm.RestClient = new rm
        .RestClient("rest", "https://api.openaq.org");
    const response: rm.IRestResponse<SeriesResponse> =
        await client
            .get<SeriesResponse>("/v1/measurements?country=IN&city=Bengaluru&parameter=co");

    return response.result;
};
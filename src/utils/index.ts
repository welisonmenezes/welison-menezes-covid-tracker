import moment from "moment";
import { IRegionData } from "../interfaces/iData";

export function regionDataFactory(
    key: string,
    result: any
): IRegionData | null {
    if (result.data[key] && result.data[key].data.length) {
        let number_of_deaths = 0;
        let number_of_cases = 0;

        const tmp: IRegionData = {
            region_code: key,
            region_name: result.data[key].location,
            number_of_deaths: number_of_deaths,
            number_of_cases: number_of_cases,
            data: [],
        };

        result.data[key].data.forEach((item: any) => {
            // to garantee that the store will get the total values
            // (some countries doesn't keep it into last item)
            number_of_deaths += item.total_deaths ? item.total_deaths : 0;
            number_of_cases += item.total_cases ? item.total_cases : 0;
            tmp.number_of_deaths = number_of_deaths;
            tmp.number_of_cases = number_of_cases;

            tmp.data.push({
                total_deaths: item.total_deaths ? item.total_deaths : 0,
                new_deaths: item.new_deaths ? item.new_deaths : 0,
                total_cases: item.total_cases ? item.total_cases : 0,
                new_cases: item.new_cases ? item.new_cases : 0,
                date: item.date,
            });
        });

        return tmp;
    }

    return null;
}

export function formatDateForHumans(date: string): string {
    let theDate: string = date;
    let theTime: string | null = null;
    if (date.indexOf(" @ ") > -1) {
        const arrDate: Array<string> = date.split(" @ ");
        theDate = arrDate[0];
        theTime = arrDate[1];
    }
    const d: Date = new Date(theDate);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    const formated: string = moment(d).format("DD/MM/YYYY");
    return theTime ? `${formated} @ ${theTime}` : `${formated}`;
}

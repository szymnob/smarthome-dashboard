// import ReactWeather, {useVisualCrossing, useWeatherBit, useOpenWeather} from "react-open-weather";
//
//
// export default function WeatherWidget_test(){
//     const { data, isLoading, errorMessage } = useVisualCrossing({
//         key: 'GVB4EV55PM3EMFG92SFMEZVPM',
//         lat: '50.049683',
//         lon: '19.944544',
//         lang: 'en',
//         unit: 'M', // values are (M,S,I)
//     });
//
//
//
//     // const { data, isLoading, errorMessage } = useWeatherBit({
//     //     key: '1110fe6047834b43ad01743ced853f79',
//     //     lat: '48.137154',
//     //     lon: '11.576124',
//     //     lang: 'en',
//     //     unit: 'M', // values are (M,S,I)
//     // });
//
//     // const { data, isLoading, errorMessage } = useOpenWeather({
//     //     key: 'f26a3c82a6041ec62a9996a3271b2f94',
//     //     lat: '48.137154',
//     //     lon: '11.576124',
//     //     lang: 'en',
//     //     unit: 'M', // values are (M,S,I)
//     // });
//
//
//     const customStyles = {
//         fontFamily:  'Helvetica, sans-serif',
//         gradientStart:  '#0181C2',
//         gradientMid:  '#04A7F9',
//         gradientEnd:  '#4BC4F7',
//         locationFontColor:  '#FFF',
//         todayTempFontColor:  '#FFF',
//         todayDateFontColor:  '#B5DEF4',
//         todayRangeFontColor:  '#B5DEF4',
//         todayDescFontColor:  '#B5DEF4',
//         todayInfoFontColor:  '#B5DEF4',
//         todayIconColor:  '#FFF',
//         forecastBackgroundColor:  '#FFF',
//         forecastSeparatorColor:  '#DDD',
//         forecastDateColor:  '#777',
//         forecastDescColor:  '#777',
//         forecastRangeColor:  '#777',
//         forecastIconColor:  '#4BC4F7',
//     };
//
//     console.log("abc");
//
//     return (
//         <div className="">
//             <ReactWeather
//                 theme={customStyles}
//                 isLoading={isLoading}
//                 errorMessage={errorMessage}
//                 data={data}
//                 lang="pl"
//                 locationLabel="Kraków"
//                 unitsLabels={{temperature: 'C', windSpeed: 'Km/h'}}
//                 showForecast
//             />
//         </div>
//     )
//
//
// }

'use client';

import Script from 'next/script';

export default function WeatherWidget() {
    return (
        <>
            <div id="ww_4776f5662fa29" v='1.3' loc='id'
                 a='{"t":"horizontal","lang":"en","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>More
                forecasts: <a href="https://oneweather.org/fr/paris/30_jours/" id="ww_4776f5662fa29_u" target="_blank">Météo
                    paris 30 jours</a></div>
            <script async src="https://app3.weatherwidget.org/js/?id=ww_4776f5662fa29"></script>
        </>
    );
}

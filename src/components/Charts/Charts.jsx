import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";

function ReactECharts({ option, style, settings, loading, title }) {
    const chartRef = useRef(null);

    useEffect(() => {
        // Initialize chart
        let chart;
        if (chartRef.current !== null) {
            chart = init(chartRef.current);
        }

        // Add chart resize listener
        // ResizeObserver is leading to a bit janky UX
        function resizeChart() {
            chart?.resize();
        }
        window.addEventListener("resize", resizeChart);

        // Return cleanup function
        return () => {
            chart?.dispose();
            window.removeEventListener("resize", resizeChart);
        };
    }, []);

    useEffect(() => {
        // Update chart
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart.setOption(option, settings);
        }
    }, [option, settings]);

    useEffect(() => {
        // Update chart
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            loading === true ? chart.showLoading() : chart.hideLoading();
        }
    }, [loading]);

    return (
        <>
            <h3 className="text-white text-center w-full text-2xl">{title}</h3>
            <div className="h-96" ref={chartRef} style={{ width: "100%", ...style }} />
        </>
    );
}

export { ReactECharts }
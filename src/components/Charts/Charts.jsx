import React, { useRef, useEffect } from "react";
import { init, getInstanceByDom } from "echarts";

function ReactECharts({ option, style, settings, loading, className }) {
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
            <div className={`charts h-96 ${className}`} ref={chartRef} style={{ ...style }} />
        </>
    );
}

export { ReactECharts }
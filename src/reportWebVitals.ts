import { ReportHandler } from 'web-vitals';

// Performance monitoring configuration
const performanceConfig = {
  enabled: process.env.NODE_ENV === 'production',
  logToConsole: process.env.NODE_ENV === 'development',
};

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Enhanced performance reporting
      const enhancedReportHandler: ReportHandler = metric => {
        // Log to console in development
        if (performanceConfig.logToConsole) {
          // eslint-disable-next-line no-console
          console.log(`[Performance] ${metric.name}:`, {
            value: metric.value,
            delta: metric.delta,
          });
        }

        // Send to analytics in production
        if (performanceConfig.enabled) {
          // You can send to Google Analytics, custom analytics, etc.
          // Example: gtag('event', metric.name, { value: metric.value });
        }

        // Call original handler
        onPerfEntry(metric);
      };

      getCLS(enhancedReportHandler);
      getFID(enhancedReportHandler);
      getFCP(enhancedReportHandler);
      getLCP(enhancedReportHandler);
      getTTFB(enhancedReportHandler);
    });
  }
};

export default reportWebVitals;

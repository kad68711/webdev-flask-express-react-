import { useQuery } from '@tanstack/react-query';
import SalesOverTimeChart from "./TotalSalesOvertime";
import SalesGrowthOverTimeChart from './SalesGrowthOvertime';
import NewCustomersOverTimeChart from './NewCustomerOvertime';
import RepeatCustomersOverTimeChart from './RepeatCustomersOvertime';
import GeoDistributionChart from './GeoDistribution';

// Get the base URI from environment variables with a fallback to localhost
const BASE_URI = process.env.VITE_API_URI || 'http://localhost:3000';

// Fetch functions using fetch API
const fetchTotalSales = async (interval) => {
  const response = await fetch(`${BASE_URI}/api/analytics/total-sales?interval=${interval}`);
  if (!response.ok) {
    throw new Error('Failed to fetch total sales');
  }
  return response.json();
};

const fetchSalesGrowth = async (interval) => {
  const response = await fetch(`${BASE_URI}/api/analytics/sales-growth?interval=${interval}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sales growth');
  }
  return response.json();
};

const fetchNewCustomers = async (interval) => {
  const response = await fetch(`${BASE_URI}/api/analytics/new-customers?interval=${interval}`);
  if (!response.ok) {
    throw new Error('Failed to fetch new customers');
  }
  return response.json();
};

const fetchRepeatCustomers = async (interval) => {
  const response = await fetch(`${BASE_URI}/api/analytics/repeat-customers?interval=${interval}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repeat customers');
  }
  return response.json();
};

const fetchGeoDistribution = async () => {
  const response = await fetch(`${BASE_URI}/api/analytics/geo-distribution`);
  if (!response.ok) {
    throw new Error('Failed to fetch geographical distribution');
  }
  return response.json();
};

const YourComponent = () => {
  const { data: totalSalesDaily, error: totalSalesDailyError } = useQuery({
    queryKey: ['totalSales', 'daily'],
    queryFn: () => fetchTotalSales('daily')
  });
  const { data: totalSalesMonthly, error: totalSalesMonthlyError } = useQuery({
    queryKey: ['totalSales', 'monthly'],
    queryFn: () => fetchTotalSales('monthly')
  });
  const { data: totalSalesQuarterly, error: totalSalesQuarterlyError } = useQuery({
    queryKey: ['totalSales', 'quarterly'],
    queryFn: () => fetchTotalSales('quarterly')
  });
  const { data: totalSalesYearly, error: totalSalesYearlyError } = useQuery({
    queryKey: ['totalSales', 'yearly'],
    queryFn: () => fetchTotalSales('yearly')
  });

  const { data: salesGrowthDaily, error: salesGrowthDailyError } = useQuery({
    queryKey: ['salesGrowth', 'daily'],
    queryFn: () => fetchSalesGrowth('daily')
  });
  
  const { data: salesGrowthMonthly, error: salesGrowthMonthlyError } = useQuery({
    queryKey: ['salesGrowth', 'monthly'],
    queryFn: () => fetchSalesGrowth('monthly')
  });
  
  const { data: salesGrowthQuarterly, error: salesGrowthQuarterlyError } = useQuery({
    queryKey: ['salesGrowth', 'quarterly'],
    queryFn: () => fetchSalesGrowth('quarterly')
  });
  
  const { data: salesGrowthYearly, error: salesGrowthYearlyError } = useQuery({
    queryKey: ['salesGrowth', 'yearly'],
    queryFn: () => fetchSalesGrowth('yearly')
  });

  const { data: newCustomersDaily, error: newCustomersDailyError } = useQuery({
    queryKey: ['newCustomers', 'daily'],
    queryFn: () => fetchNewCustomers('daily')
  });
  
  const { data: newCustomersMonthly, error: newCustomersMonthlyError } = useQuery({
    queryKey: ['newCustomers', 'monthly'],
    queryFn: () => fetchNewCustomers('monthly')
  });
  
  const { data: newCustomersQuarterly, error: newCustomersQuarterlyError } = useQuery({
    queryKey: ['newCustomers', 'quarterly'],
    queryFn: () => fetchNewCustomers('quarterly')
  });
  
  const { data: newCustomersYearly, error: newCustomersYearlyError } = useQuery({
    queryKey: ['newCustomers', 'yearly'],
    queryFn: () => fetchNewCustomers('yearly')
  });

  const { data: repeatCustomersDaily, error: repeatCustomersDailyError } = useQuery({
    queryKey: ['repeatCustomers', 'daily'],
    queryFn: () => fetchRepeatCustomers('daily')
  });
  
  const { data: repeatCustomersMonthly, error: repeatCustomersMonthlyError } = useQuery({
    queryKey: ['repeatCustomers', 'monthly'],
    queryFn: () => fetchRepeatCustomers('monthly')
  });
  
  const { data: repeatCustomersQuarterly, error: repeatCustomersQuarterlyError } = useQuery({
    queryKey: ['repeatCustomers', 'quarterly'],
    queryFn: () => fetchRepeatCustomers('quarterly')
  });
  
  const { data: repeatCustomersYearly, error: repeatCustomersYearlyError } = useQuery({
    queryKey: ['repeatCustomers', 'yearly'],
    queryFn: () => fetchRepeatCustomers('yearly')
  });

  const { data: geoDistribution, error: geoDistributionError } = useQuery({
    queryKey: ['geoDistribution'],
    queryFn: fetchGeoDistribution
  });

  if (totalSalesDailyError || salesGrowthDailyError || newCustomersDailyError || repeatCustomersDailyError || geoDistributionError) {
    console.error({
      totalSalesDailyError,
      salesGrowthDailyError,
      newCustomersDailyError,
      repeatCustomersDailyError,
      geoDistributionError
    });
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div>
        <SalesOverTimeChart salesData={totalSalesDaily} timePeriod={"daily"} />
        <SalesOverTimeChart salesData={totalSalesMonthly} timePeriod={"monthly"} />
        <SalesOverTimeChart salesData={totalSalesQuarterly} timePeriod={"quarterly"} />
        <SalesOverTimeChart salesData={totalSalesYearly} timePeriod={"yearly"} />
      </div>
      <div>
        <SalesGrowthOverTimeChart salesData={salesGrowthDaily} timePeriod={"daily"} />
        <SalesGrowthOverTimeChart salesData={salesGrowthMonthly} timePeriod={"monthly"} />
        <SalesGrowthOverTimeChart salesData={salesGrowthQuarterly} timePeriod={"quarterly"} />
        <SalesGrowthOverTimeChart salesData={salesGrowthYearly} timePeriod={"yearly"} />
      </div>
      <div>
        <NewCustomersOverTimeChart salesData={newCustomersDaily} timePeriod={"daily"} />
        <NewCustomersOverTimeChart salesData={newCustomersMonthly} timePeriod={"monthly"} />
        <NewCustomersOverTimeChart salesData={newCustomersQuarterly} timePeriod={"quarterly"} />
        <NewCustomersOverTimeChart salesData={newCustomersYearly} timePeriod={"yearly"} />
      </div>
      <div>
        <RepeatCustomersOverTimeChart salesData={repeatCustomersDaily} timePeriod={"daily"} />
        <RepeatCustomersOverTimeChart salesData={repeatCustomersMonthly} timePeriod={"monthly"} />
        <RepeatCustomersOverTimeChart salesData={repeatCustomersQuarterly} timePeriod={"quarterly"} />
        <RepeatCustomersOverTimeChart salesData={repeatCustomersYearly} timePeriod={"yearly"} />
      </div>
      <div>
        <GeoDistributionChart geoData={geoDistribution} />
      </div>
    </div>
  );
};

export default YourComponent;

import { Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import BankingWidgetSummary from "../../widget/banking-widget-summary";
import EcommerceWidgetSummary from "../../widget/ecommerce-widget-summary";
import EcommerceYearlySales from "../../widget/ecommerce-yearly-sales";

const DemoGraphs = () => {
  const theme = useTheme();

  return (
    <Stack gap={2}>
      <Typography fontWeight={500}>Future Graphs</Typography>

      <Divider />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} xl={3}>
          <EcommerceWidgetSummary
            title="Product Sold"
            percent={2.6}
            total={765}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <EcommerceWidgetSummary
            title="Total Balance"
            percent={-0.1}
            total={18765}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <EcommerceWidgetSummary
            title="Sales Profit"
            percent={0.6}
            total={4876}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <EcommerceWidgetSummary
            title="Total Profit"
            percent={0.6}
            total={8615}
            chart={{
              colors: [theme.palette.success.light, theme.palette.success.main],
              series: [40, 36, 58, 70, 50, 42, 24, 64, 38, 27],
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EcommerceYearlySales
            title="Yearly Sales"
            subheader="(+43%) than last year"
            chart={{
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              series: [
                {
                  year: "2023",
                  data: [
                    {
                      name: "Total Income",
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: "Total Expenses",
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: "2024",
                  data: [
                    {
                      name: "Total Income",
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: "Total Expenses",
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BankingWidgetSummary
            title="Income"
            icon="eva:diagonal-arrow-left-down-fill"
            percent={2.6}
            total={18765}
            chart={{
              series: [
                { x: 2010, y: 88 },
                { x: 2011, y: 120 },
                { x: 2012, y: 156 },
                { x: 2013, y: 123 },
                { x: 2014, y: 88 },
                { x: 2015, y: 66 },
                { x: 2016, y: 45 },
                { x: 2017, y: 29 },
                { x: 2018, y: 45 },
                { x: 2019, y: 88 },
                { x: 2020, y: 132 },
                { x: 2021, y: 146 },
                { x: 2022, y: 169 },
                { x: 2023, y: 184 },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BankingWidgetSummary
            title="Expenses"
            color="warning"
            icon="eva:diagonal-arrow-right-up-fill"
            percent={-0.5}
            total={8938}
            chart={{
              series: [
                { x: 2010, y: 88 },
                { x: 2011, y: 120 },
                { x: 2012, y: 156 },
                { x: 2013, y: 123 },
                { x: 2014, y: 88 },
                { x: 2015, y: 166 },
                { x: 2016, y: 145 },
                { x: 2017, y: 129 },
                { x: 2018, y: 145 },
                { x: 2019, y: 188 },
                { x: 2020, y: 132 },
                { x: 2021, y: 146 },
                { x: 2022, y: 169 },
                { x: 2023, y: 184 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default DemoGraphs;

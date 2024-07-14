import React, { useState, useEffect } from "react";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Flex } from "antd";
// ** Icons Imports

const StatisticsCard = ({ data }) => {
  interface User {
    _id: string;
    name: string;
    pic: string;
    email: string;
    accountType: string;
    createdAt: string;
  }

  interface TotalPriceProps {
    data: User[];
  }
  const [users, setUsers] = useState([{}]);
  const [total, setTotal] = useState(0);
  const [countYear, setCountYear] = useState(0);
  const [countMonth, setCountMonth] = useState(0);
  const [countFree, setCountFree] = useState(0);

  useEffect(() => {
    setUsers(data);
    let yearCount = 0;
    let monthCount = 0;
    let freeCount = 0;

    data.forEach((user) => {
      if (user.accountType === "premium_year") {
        yearCount++;
      } else if (user.accountType === "premium_month") {
        monthCount++;
      } else if (user.accountType === "free") {
        freeCount++;
      }
    });

    setCountYear(yearCount);
    setCountMonth(monthCount);
    setCountFree(freeCount);
    setTotal(data.length);
  }, [data]);

  const salesData = [
    {
      stats: `${countFree}`, // Chuyển đổi maxTotalPrice thành dạng hiển thị tiền tệ
      title: "Account Free",
      color: "primary",
      //   icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: `${countMonth}`,
      title: "Account Premium Month",
      color: "success",
      //   icon: <AccountOutline sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: `${countYear}`,
      title: "Account Premium Year",
      color: "warning",
      //   icon: <CellphoneLink sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid
        item
        xs={12}
        sm={4}
        key={index}
        alignItems={"center"}
        display={"flex"}
      >
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}.main`,
            }}
          >
            {/* {item.icon} */}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title="Details"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
            {/* <DotsVertical /> */}
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;

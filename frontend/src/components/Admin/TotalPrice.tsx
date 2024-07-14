import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";

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

// Styled component for the triangle shaped background image
const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

// Styled component for the trophy image
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Trophy = ({ data }) => {
  const [users, setUsers] = useState([{}]);
  const [total, setTotal] = useState(0);
  const [countYear, setCountYear] = useState(0);
  const [countMonth, setCountMonth] = useState(0);
  const [countFree, setCountFree] = useState(0);

  useEffect(() => {
    setUsers(data);
    console.log("data nè:", data);
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
  // ** Hook
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "light" ? "triangle-light.png" : "triangle-dark.png";

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6">Summary! 🥳</Typography>
        <Typography variant="body2" sx={{ letterSpacing: "0.25px" }}>
          Total Price of all Account
        </Typography>
        <Typography variant="h5" sx={{ my: 4, color: "primary.main" }}>
          {countFree * 0 + countMonth * 29000 + countYear * 290000} VND
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Trophy;

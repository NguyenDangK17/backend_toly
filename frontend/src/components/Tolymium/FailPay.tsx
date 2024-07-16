import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

interface OrderProps {
  id: string;
  orderCode: string;
  amount: number;
  status: string;
  createdAt: Date;
}

function TableHeader() {
  return (
    <Toolbar className="!flex-1 !justify-center">
      <Typography className="!font-semibold" component="h5" variant="h5">
        Mô tả đơn hàng
      </Typography>
    </Toolbar>
  );
}

const FailPay: React.FC = () => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [orders, setOrders] = useState<OrderProps>();
  const urlParams = new URLSearchParams(window.location.search);
  const orderCode = urlParams.get("orderCode");

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (orderCode !== null) {
          const { data } = await axios.get(
            `http://localhost:5000/api/order/get-payment-link-info/${orderCode}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setOrders(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrder();
  });

  return (
    <Box justifyContent="center">
      <CssBaseline />
      <Box sx={{ marginTop: "40px", marginBottom: "40px" }}>
        {/* <Typography className="!text-center">
          Đơn hàng{" "}
          <b>{orders?.orderCode ? `#${orders.orderCode}` : "không tìm thấy"}</b>
          {orders?.status
            ? orders.status == "PAID"
              ? ` đã thanh toán thành công`
              : ` chưa được thanh toán`
            : ""}
        </Typography> */}
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "40px 0 80px 0",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Result
          status="warning"
          title="There are some problems with your payment."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate("/tolymium")}
            >
              Go Tolymium
            </Button>
          }
        />
        <Paper>
          <TableHeader />
          <TableContainer>
            <Table size="small" className="md:min-w-[700px]">
              <TableBody>
                {orders ? (
                  <>
                    <TableRow key={"id"}>
                      <TableCell align="left">
                        <Typography>Mã đơn hàng</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <b>#{orders["orderCode"]}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow key={"status"}>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left">
                        {orders["status"] == "PAID"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </TableCell>
                    </TableRow>
                    <TableRow key={"items"}>
                      <TableCell align="left">Sản phẩm</TableCell>
                      <TableCell align="left">
                        <ul>
                          <li>{`Tên sản phẩm: Gói Premium ${
                            orders.amount === 29000 ? "Month" : "Year"
                          }`}</li>
                          <li>{`Số lượng: 1`}</li>
                          <li>{`Đơn giá: ${orders.amount} VNĐ`}</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                    <TableRow key={"amount"}>
                      <TableCell align="left">Tổng tiền</TableCell>
                      <TableCell align="left">{orders["amount"]} VNĐ</TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow
                    key={0}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" colSpan={12}>
                      Không có thông tin đơn hàng
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default FailPay;

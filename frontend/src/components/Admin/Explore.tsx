import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";
import axios from "axios";

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   href: "https://ant.design",
//   title: `ant design part ${i}`,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   description:
//     "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//   content:
//     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// }));
interface ExploreData {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  position: {
    lat: number;
    lng: number;
  };
}

const Explore: React.FC = () => {
  const [exploreData, setExploreData] = useState<ExploreData[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get<ExploreData[]>(
        "http://localhost:5000/api/explore"
      );
      console.log(response.data);

      setExploreData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <List
        grid={{ column: 2, gutter: 12 }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={exploreData}
        renderItem={(item) => (
          <List.Item
            style={{
              display: "flex",
              flexDirection: "row",
              border: "1px solid #ccc",
              padding: 20,
              borderRadius: 10,
            }}
            key={item._id}
            actions={[<Button> Edit</Button>, <Button danger>Delete</Button>]}
            extra={
              <img
                width={272}
                height={180}
                style={{ borderRadius: 12 }}
                alt="logo"
                src={item.imageUrl}
              />
            }
          >
            <List.Item.Meta
              // avatar={<Avatar src={item.avatar} />}

              title={<a>{item.name}</a>}
              description={item.priceRange}
            />
            {/* {item.content} */}
          </List.Item>
        )}
      />
    </>
  );
};

export default Explore;

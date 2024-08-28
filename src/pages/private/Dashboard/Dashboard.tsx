import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { authStore } from "context/auth/store";
import { EditUserModal } from "pages/components";
import React, { useState } from "react";

const Dashboard = () => {
  const { authUser } = authStore();
  console.log(authUser?.editUser);
  const [isShowModal, setiIshowModal] = useState<boolean>(false);
  const setModalInvisible = () => {
    setiIshowModal(false);
  };
  return (
    <>
      {authUser?.editUser || (
        <Flex
          flex={1}
          justify="center"
          style={{
            background: "#1dd0e2",
            borderRadius: "20px",
            padding: "10px 15px",
          }}
        >
          <Typography.Text>
            Өөрийн ургийн бүртгэлийг үнэн зөв оруулна уу.
            <Button
              type="link"
              onClick={() => {
                setiIshowModal(true);
              }}
            >
              <Typography.Text underline strong>
                Үргэжлүүлэх
                <ArrowRightOutlined style={{ marginLeft: "5px" }} />
              </Typography.Text>
            </Button>
          </Typography.Text>
        </Flex>
      )}
      <EditUserModal
        isShow={isShowModal}
        handleCancel={() => setiIshowModal(!isShowModal)}
        toggleModal={setModalInvisible}
      />
    </>
  );
};

export default Dashboard;

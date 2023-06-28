import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Radio, Tooltip } from "@nextui-org/react";
import useAuth from "../custom-hooks/useAuth";
import { storage, db } from "../firebase.config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserInfomation = () => {
    const [isUploadFile,setIsUploadFile] = useState("false");

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [userInfomation, setUserInformation] = useState({
    fullname: "",
    phoneNumber: "",
    IDCard: "",
    gender: "",
    imgUrl: null,
  });

  useEffect(() => {
    return () => {
      userInfomation.imgUrl &&
        URL.revokeObjectURL(userInfomation.imgUrl.preview);
    };
  }, [userInfomation.imgUrl]);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setUserInformation((oldState) => {
      return { ...oldState, imgUrl: file };
    });
    setIsUploadFile(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {  
        if (isUploadFile === true) {
            console.log("Update with image!")
            const storageRef = ref(storage, `images/${Date.now() + currentUser.uid}`);
            const uploadTask = uploadBytesResumable(
                storageRef,
                userInfomation.imgUrl
            );
            uploadTask.on(
                () => {
                toast.error("Không thể upload hình ảnh!");
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    // update thông tin vào database
                    await updateDoc(doc(db, "users", currentUser.uid), {
                    photoURL: userInfomation.imgUrl.preview
                        ? downloadURL
                        : userInfomation.imgUrl,
                    phoneNumber: userInfomation.phoneNumber,
                    fullname: userInfomation.fullname,
                    IDCard: userInfomation.IDCard,
                    gender: userInfomation.gender,
                    });
                    // update thông tin vào auth
                    await updateProfile(currentUser, {
                    photoURL: userInfomation.imgUrl.preview
                        ? downloadURL
                        : userInfomation.imgUrl,
                    });
                    await navigate(0);
                });
                }
            );
        }
        else {
            updateDoc(doc(db, "users", currentUser.uid), {
                phoneNumber: userInfomation.phoneNumber,
                fullname: userInfomation.fullname,
                IDCard: userInfomation.IDCard,
                gender: userInfomation.gender,
                });
            await navigate(0);
        }
        toast.success("Chỉnh sửa thông tin cá nhân thành công!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    console.log("Get data từ database");
    const getInformation = async () => {
      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setUserInformation({
          fullname: data.fullname ? data.fullname : "",
          phoneNumber: data.phoneNumber ? data.phoneNumber : "",
          IDCard: data.IDCard ? data.IDCard : "",
          gender: data.gender ? data.gender : "",
        });
      } else {
        console.log("User not found!");
      }
    };
    getInformation();
  }, [currentUser.uid]);

  return (
    <div>
      <Container className="space-y-3">
        <Row>
          <Col lg="6" className="p-4 space-y-4">
            <h3 className="text-xl font-semibold md:mt-5">Thông tin cá nhân</h3>
            <div className="text-sm text-gray-400 font-medium">
              Bây giờ bạn có thể tự chỉnh sửa thông tin cá nhân.
              <br /> Thông tin cá nhân có thể mất một vài phút để cập nhật
            </div>

            <div className="my-4 bg-slate-200 h-[0.5px]" />

            <div className="md:text-sm text-xs flex justify-between">
              <div>
                <div>Tên đăng nhập:</div>
                <div className="font-semibold">{currentUser.displayName}</div>
              </div>
              <div>
                <div>Email:</div>
                <div className="font-semibold">{currentUser.email}</div>
              </div>
              <div>
                <div>Ngày tham gia:</div>
                <div className="font-semibold">01-04-2023</div>
              </div>
            </div>

            <div className="my-4 bg-slate-200 h-[0.5px]" />

            <div className="space-y-10">
              <div>
                <label
                  aria-label="Họ và tên"
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 pl-0.5"
                >
                  Họ và tên
                </label>
                <input
                  onChange={(e) => {
                    setUserInformation((oldState) => {
                      return { ...oldState, fullname: e.target.value };
                    });
                  }}
                  value={userInfomation.fullname}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  aria-label="Số điện thoại"
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 pl-0.5"
                >
                  Số điện thoại
                </label>
                <input
                  onChange={(e) => {
                    setUserInformation((oldState) => {
                      return { ...oldState, phoneNumber: e.target.value };
                    });
                  }}
                  value={userInfomation.phoneNumber}
                  class="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  aria-label="CCCD"
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 pl-0.5"
                >
                  Căn cước công dân
                </label>
                <input
                  onChange={(e) => {
                    setUserInformation((oldState) => {
                      return { ...oldState, IDCard: e.target.value };
                    });
                  }}
                  value={userInfomation.IDCard}
                  class="bg-gray-50 border border-gray-300 text-gray-900 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
          </Col>
          <Col lg="6" className="p-4 space-y-4">
            <div className="text-md font-semibold text-gray-500 md:mt-5">
              Ảnh đại diện
            </div>

            <div className="flex justify-center pt-6">
              <Tooltip content="Chọn hình ảnh đại diện khác" color="invert">
                <div
                  onClick={() => {
                    document.querySelector(".input-field").click();
                  }}
                  className="bg-gray-200 h-[15rem] w-[15rem] rounded-full relative overflow-hidden ring-offset-2 ring-2"
                >
                  <img
                    className="object-contain"
                    src={
                      !userInfomation.imgUrl
                        ? currentUser.photoURL
                        : userInfomation.imgUrl.preview
                    }
                    alt=""
                  ></img>
                </div>
                <input
                  hidden
                  onChange={handleUploadFile}
                  className="input-field"
                  accept=".jpeg, .jpg, .png, .webp, .svg"
                  type="file"
                />
              </Tooltip>
            </div>
            <div className="space-y-4 pt-6">
              <div className="font-semibold">Giới tính của bạn</div>
              <div>
                <Radio.Group
                  onChange={(e) => {
                    setUserInformation((oldState) => {
                      return { ...oldState, gender: e };
                    });
                  }}
                  value={userInfomation.gender}
                  orientation="horizontal"
                  size="sm"
                >
                  <Radio className="font-medium" value="male">
                    Nam
                  </Radio>
                  <Radio className="font-medium" value="female">
                    Nữ
                  </Radio>
                  <Radio className="font-medium" value="non-binary">
                    Khác
                  </Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
          <div className="flex justify-end mb-8">
            <button
              onClick={handleSave}
              className="bg-black md:my-10 text-white text-sm py-2 px-4 rounded-lg font-semibold"
              auto
            >
              Lưu thay đổi
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default UserInfomation;

import { Form, Input, InputNumber, Select, Switch } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatThongTinPhongAction,
  layThongTinChiTietPhong,
  taoPhongAction,
} from "../../../../redux/actions/QuanLyPhongAction";
import { layDanhSachViTriAction } from "../../../../redux/actions/QuanLyViTriAction";

const { Option } = Select;

export default function EditRoom(props) {
  const { arrViTri } = useSelector((state) => state.QuanLyViTriReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachViTriAction());
  }, []);
  const renderViTri = () => {
    return arrViTri.map((viTri, index) => {
      return (
        <Option value={viTri._id} key={index}>
          {viTri.province}
        </Option>
      );
    });
  };

  useEffect(() => {
    let { id } = props.match.params;
    dispatch(layThongTinChiTietPhong(id));
  }, []);
  const { chiTietPhong } = useSelector((state) => state.QuanLyPhongReducer);
  // console.log({ chiTietPhong });

  const provinceDefault = chiTietPhong.locationId?.province;
  const index = arrViTri.findIndex((viTri) => {
    return viTri.province === provinceDefault;
  });
  const locationDefault = arrViTri[index];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: chiTietPhong._id,
      name: chiTietPhong.name,
      guests: chiTietPhong.guests,
      bedRoom: chiTietPhong.bedRoom,
      bath: chiTietPhong.bath,
      description: chiTietPhong.description,
      price: chiTietPhong.price,
      elevator: chiTietPhong.elevator,
      hotTub: chiTietPhong.hotTub,
      pool: chiTietPhong.pool,
      indoorFireplace: chiTietPhong.indoorFireplace,
      dryer: chiTietPhong.dryer,
      gym: chiTietPhong.gym,
      kitchen: chiTietPhong.kitchen,
      wifi: chiTietPhong.wifi,
      heating: chiTietPhong.heating,
      cableTV: chiTietPhong.cableTV,
      locationId: locationDefault?._id,
    },
    onSubmit: (values) => {
      console.log({ values });
      dispatch(capNhatThongTinPhongAction(values._id, values));
    },
  });

  const handleSwitch = (name) => {
    return (values) => {
      formik.setFieldValue(name, values);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    console.log({ file });
    formik.setFieldValue("image", file);
  };

  return (
    <div>
      <h3 className="text-center text-2xl text-rose-600 mb-5">
        Ch???nh s???a th??ng tin chi ti???t ph??ng
      </h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="T??n kh??ch s???n">
          <Input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Item>
        <Form.Item label="Kh??ch">
          <InputNumber
            onChange={handleSwitch("guests")}
            value={formik.values.guests}
            min={1}
            max={4}
          />
        </Form.Item>
        <Form.Item label="Ph??ng ng???">
          <InputNumber
            onChange={handleSwitch("bedRoom")}
            value={formik.values.bedRoom}
            min={1}
            max={4}
          />
        </Form.Item>
        <Form.Item label="Nh?? t???m">
          <InputNumber
            onChange={handleSwitch("bath")}
            value={formik.values.bath}
            min={1}
            max={4}
          />
        </Form.Item>
        <Form.Item label="M?? t???">
          <Input
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Form.Item>
        <Form.Item label="Gi?? ph??ng">
          <InputNumber
            onChange={handleSwitch("price")}
            value={formik.values.price}
          />
        </Form.Item>
        <Form.Item label="Thang m??y">
          <Switch
            onChange={handleSwitch("elevator")}
            checked={formik.values.elevator}
          />
        </Form.Item>
        <Form.Item label="B???n n?????c n??ng">
          <Switch
            onChange={handleSwitch("hotTub")}
            checked={formik.values.hotTub}
          />
        </Form.Item>
        <Form.Item label="H??? b??i">
          <Switch
            onChange={handleSwitch("pool")}
            checked={formik.values.pool}
          />
        </Form.Item>
        <Form.Item label="L?? s?????i trong ph??ng">
          <Switch
            onChange={handleSwitch("indoorFireplace")}
            checked={formik.values.indoorFireplace}
          />
        </Form.Item>
        <Form.Item label="M??y s???y kh??">
          <Switch
            onChange={handleSwitch("dryer")}
            checked={formik.values.dryer}
          />
        </Form.Item>
        <Form.Item label="Gym">
          <Switch onChange={handleSwitch("gym")} checked={formik.values.gym} />
        </Form.Item>
        <Form.Item label="B???p">
          <Switch
            onChange={handleSwitch("kitchen")}
            checked={formik.values.kitchen}
          />
        </Form.Item>
        <Form.Item label="Wifi">
          <Switch
            onChange={handleSwitch("wifi")}
            checked={formik.values.wifi}
          />
        </Form.Item>
        <Form.Item label="M??y l???nh">
          <Switch
            onChange={handleSwitch("heating")}
            checked={formik.values.heating}
          />
        </Form.Item>
        <Form.Item label="Ti vi">
          <Switch
            onChange={handleSwitch("cableTV")}
            checked={formik.values.cableTV}
          />
        </Form.Item>
        <Form.Item label="H??nh ???nh">
          <input type="file" onChange={handleChangeFile} />
        </Form.Item>
        <Form.Item name="locationId" label="V??? tr??">
          <Select
            style={{
              width: "100%",
            }}
            onChange={handleSwitch("locationId")}
            allowClear
          >
            {renderViTri()}
          </Select>
        </Form.Item>

        <div className="text-center">
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
          >
            C???p nh???t
          </button>
        </div>
      </Form>
    </div>
  );
}

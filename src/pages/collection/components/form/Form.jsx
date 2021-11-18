import React,{forwardRef} from "react";
import { Form, Input } from "antd";
const NewForm = forwardRef((props, ref)=> {
    return (
      <div>
        <Form name="basic" ref={ref}>
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {props.type === 'site'? <Form.Item
            label="地址"
            name="href"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          >
            <Input />
          </Form.Item>:null}
        </Form>
      </div>
    );
  })

export default NewForm;

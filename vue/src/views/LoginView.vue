<template>
  <div style="width: 500px; margin: 0 auto">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: "",
      password: "",
    });
    const onFinish = async (values: FormState) => {
      console.log("Success:", values);
      const { username, password } = values;
      const { data } = await axios.post("/api/user/login", {
        username,
        password,
      });
      if (data.code === 200 && data.data.token) {
        sessionStorage.token = data.data.token;
        message.success(data.message);
      } else {
        message.error(data.message);
      }
      // console.log(3333, res);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

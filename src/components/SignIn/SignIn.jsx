import React from "react";
import { useForm } from "react-hook-form";
import "./SignIn.css";
import { Button, Flex, PasswordField, TextField, fr } from "@prismane/core";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { username, required } from "@prismane/core/validators";

function SignIn(props) {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    fields: {
      login: {
        value: "v",
        validators: {
          username: (v) => username(v),
          required: (v) => required(v),
        },
      },
      password: {
        value: "v",
        validators: {
          required: (v) => required(v),
        },
      },
    },
  });

  const onSubmit = (data) => {
    props.onLogin(data);
    console.log(`Your name ${data.login}`);
    // alert(`Your name ${data.login}`);
    // reset();
  };

  // Обработчик самбита формы
  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   props.onLogin(values);
  // }

  return (
    <main className="signin">
      <section className="signin__container">
        <h2 className="signin__title">Вход</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="signin__form">
          <TextField
            name="login"
            placeholder="Введите свой логин: ivan1992"
            label="Логин:"
            icon={<EnvelopeSimple />}
            {...register("login")}
          />
          <PasswordField
            name="password"
            placeholder="Введите свой пароль"
            label="Логин:"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password")}
          />
          <Flex justify="center" align="center" gap={fr(1)}>
            <Button variant="primary" type="submit" size="md">
              Войти
            </Button>
            {/* <Button variant="primary" type="reset">
              Reset
            </Button> */}
          </Flex>
        </form>
      </section>
    </main>
  );
}

export default SignIn;

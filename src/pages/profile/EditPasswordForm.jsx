import { useState, useEffect } from "react";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import Label from "../../components/UI/Label";
import InputPassword from "../../components/UI/InputPassword";
import Button from "../../components/UI/Button";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const { errors, loading, handleUpdatePassword } = useUpdatePassword();

  const handlePasswordChange = (type, e) => {
    if (type === "current_password") {
      setCurrentPassword(e.target.value);
    }
    if (type === "new_password") {
      setNewPassword(e.target.value);
    }
    if (type === "new_password_confirmation") {
      setNewPasswordConfirmation(e.target.value);
    }
  };

  useEffect(() => {
    if (loading) return;
    document.title = `Cambiar contraseña`;
  }, [loading]);

  return (
    <form
      className="bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 rounded-lg p-2 md:p-6 w-full md:w-[500px] mx-auto mt-20"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-white text-2xl text-center font-medium">
        Cambiar Contraseña
      </h1>
      <div className="mt-3">
        <Label
          inputId={"current_password"}
          value={"Contraseña actual"}
          error={errors.current_password ? errors.current_password : null}
        >
          <InputPassword
            inputId={"current_password"}
            name={"current_password"}
            placeholder={"Tu contraseña actual"}
            onChange={(e) => handlePasswordChange("current_password", e)}
          />
        </Label>
      </div>

      <div className="mt-5">
        <Label
          inputId={"new_password"}
          value={"Tu nueva contraseña"}
          error={errors.new_password ? errors.new_password : null}
        >
          <InputPassword
            inputId={"new_password"}
            name={"new_password"}
            placeholder={"Tu nueva contraseña"}
            onChange={(e) => handlePasswordChange("new_password", e)}
          />
        </Label>
      </div>
      <div className="mt-3">
        <Label
          inputId={"new_password_confirmation"}
          value={"Repite tu nueva contraseña"}
          error={
            errors.new_password_confirmation
              ? errors.new_password_confirmation
              : null
          }
        >
          <InputPassword
            inputId={"new_password_confirmation"}
            name={"new_password_confirmation"}
            placeholder={"Repite tu nueva contraseña"}
            onChange={(e) =>
              handlePasswordChange("new_password_confirmation", e)
            }
          />
        </Label>
      </div>
      <div className="mt-5 flex justify-center">
        <Button
          text={"Confirmar"}
          disabled={loading}
          onClick={() => {
            handleUpdatePassword(
              currentPassword,
              newPassword,
              newPasswordConfirmation
            );
          }}
        />
      </div>
    </form>
  );
};
export default EditPassword;

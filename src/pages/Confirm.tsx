import { useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmRegistrationMutation } from "../features/api/bookApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Confirm() {
  const [confirmRegistration, { data, isError, isSuccess, isLoading, error }] =
    useConfirmRegistrationMutation();
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParam.get("token");
  useEffect(() => {
    async function confirmation() {
      try {
        const result = await confirmRegistration({ token }).unwrap();
        console.log(result);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
    confirmation();
  }, []);

  if (isSuccess) {
    toast.success(data.message);
    navigate("/login");
  }
  if (isError) {
    toast.error((error as any).data.error);
    navigate("/");
  }
  if (isLoading) {
    return <Spinner />;
  }
  return <div>confirming...</div>;
}

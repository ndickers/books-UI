import { BallTriangle } from "react-loader-spinner";
export default function Spinner() {
  return (
    <div className="absolute top-0 opacity-70 flex items-center justify-center left-0 h-[100vh] w-[100vw] bg-black">
      <BallTriangle
        height={150}
        width={150}
        radius={9}
        color="white"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

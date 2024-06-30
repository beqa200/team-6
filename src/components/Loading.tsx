import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="10"
        animationDuration="0.8"
        width="300"
        visible={true}
      />
    </div>
  );
}
export default Loader;

import ResumeComponent from "../components/ResumeComponent";
import styled from "styled-components";

function ResumePage() {
  return (
    <ResumeStyle>
      <ResumeComponent />
      <div className="success">
        <span>რეზიუმე წარმატებით გაიგზავნა 🎉</span>
      </div>
    </ResumeStyle>
  );
}

export default ResumePage;
const ResumeStyle = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  & > div {
    width: 700px;
    height: 1080px;
    flex-shrink: 0;
    margin-top: 2rem;
    border: 0.8px solid #000;
    background: #fff;
  }
  .success {
    position: absolute;
    right: 0rem;
    display: flex;
    width: 376px;
    height: 167px;
    padding: 28px 30px 30px 30px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 8px;
    border: 1px solid #e4e4e4;
    background: #fff;
    box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.25);
    span {
      color: var(--off-black, #1a1a1a);
      font-family: "Helvetica Neue";
      font-size: 28px;
      font-style: normal;
      font-weight: 500;
      line-height: 43px; /* 153.571% */
      width: 364px;
      flex-shrink: 0;
    }
  }
`;

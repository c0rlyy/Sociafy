import SociafyLogo from "../../assets/3x/Obszar roboczy 1@3x.png";
type ErrorProps = {
  error: Error;
};

const ErrorInd: React.FC<ErrorProps> = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <img src={`${SociafyLogo}`} alt="" />
    </main>
  );
};

export default ErrorInd;

import { useContext } from "react";
import { UIContext } from "src/context/ui";
import Loading from "src/components/UI/Loading";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ScreenLoader = ({ children }: Props) => {
  const uiContext = useContext(UIContext);
  const { uiState } = uiContext;

  return (
    <>
      {uiState.checking && <Loading />}
      {children}
    </>
  );
};

export default ScreenLoader;

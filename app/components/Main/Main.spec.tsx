import { render } from "@testing-library/react";
import Main from "./Main";

describe("Home", () => {
  it("renders an App", () => {
    const { getByText } = render(<Main version={"13"} />);

    expect(getByText("go build something awesome")).toBeInTheDocument();
  });

  it("doesn't render anything fishy", () => {
    const { queryByText } = render(<Main version={"13"} />);

    expect(queryByText("fishy")).not.toBeInTheDocument();
  });
});

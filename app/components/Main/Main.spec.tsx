import { render } from "@testing-library/react";
import Main from "./Main";
import { mockPeople, mockPlanets } from "../../mocks/mocks";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Home", () => {
  it("renders the table", () => {
    const { getByText, getByTestId, getAllByTestId } = render(
      <Main people={mockPeople} planets={mockPlanets} />
    );

    expect(getByText("Shili")).toBeInTheDocument();
    expect(getByText("Umbara")).toBeInTheDocument();
    expect(getByTestId("sw-table")).toBeInTheDocument();
    expect(getAllByTestId("planet-button")).toHaveLength(2);
  });
});

import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup, { SIGNUP_MUTATION } from "../components/Signup";
import { fakeUser } from "../lib/testUtils";

const me = fakeUser();

const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: "ogzi",
      },
    },
    result: {
      data: {
        createUser: {
          __typename: "User",
          id: "1234abc",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // If we refetch query
  // {
  //     request: {
  //         query: CURRENT_USER_QUERY,
  //     },
  //     result: {
  //         data: {
  //             authenticatedItem: me,
  //         },
  //     },
  // },
];

describe("<Signup />", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("Calls the mutation properly", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), "ogzi");

    await userEvent.click(screen.getByTestId("signupButton"));
    await screen.findByText(
      `Signed up with ${me.email} - Please go head and sign in!`
    );
  });
});

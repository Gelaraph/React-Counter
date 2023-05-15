import { render, screen, fireEvent } from "@testing-library/react";
import CounterApp from "./component/homework_seven/CounterApp";

describe("Counter", () => {
  // *************************** Rendering Test ***************************
  it("Ensures the Counter component renders without crashing", () => {
    render(<CounterApp />);
  });

  // *************************** Functionality Tests ***************************
  it("Ensures increment of count by 1, up to a maximum of 10 when the 'Increment' button is clicked", () => {
    render(<CounterApp />);
    const incrementButton = screen.getByText("Increment");
    const countDisplayed = screen.getByText("0");

    fireEvent.click(incrementButton);
    expect(countDisplayed).toHaveTextContent("1");

    fireEvent.click(incrementButton);
    expect(countDisplayed).toHaveTextContent("2");

    // continue clicking the button until the count reaches 10
    for (let i = 2; i < 10; i++) {
      fireEvent.click(incrementButton);
      expect(countDisplayed).toHaveTextContent(`${i + 1}`);
    }

    // the count should not go above 10
    fireEvent.click(incrementButton);
    expect(countDisplayed).toHaveTextContent("10");
  });

  // *************************** Edge Case Tests ***************************
  it("Ensures decrement of count by 1, but not below 0, when the 'Decrement' button is clicked", () => {
    render(<CounterApp />);
    const decrementButton = screen.getByText("Decrement");
    const countDisplayed = screen.getByText("0");

    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("0");

    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("0");

    // increment the count to 3
    const incrementButton = screen.getByText("Increment");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("2");

    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("1");

    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("0");

    // the count should not go below 0
    fireEvent.click(decrementButton);
    expect(countDisplayed).toHaveTextContent("0");
  });

  it("Ensures the 'Increment' button does not go above count limit and corresponding buttons are disabled", () => {
    render(<CounterApp />);
    const incrementButton = screen.getByText("Increment");

    // decrement the count to 10 by clicking the 'increment' button
    for (let i = 0; i < 10; i++) {
      fireEvent.click(incrementButton);
    }

    // the increment button should be disabled
    expect(incrementButton).toBeDisabled();

    // try to increment the count when it's at the maximum
    fireEvent.click(incrementButton);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("Ensures the 'Decrement' button does not go below count limit and corresponding buttons are disabled", () => {
    render(<CounterApp />);
    const decrementButton = screen.getByText("Decrement");

    // decrement the count to 0 by clicking the 'Decrement' button
    for (let i = 0; i < 10; i++) {
      fireEvent.click(decrementButton);
    }

    // decrement button should be disabled
    expect(decrementButton).toBeDisabled();

    // try to decrement the count when it's at the minimum
    fireEvent.click(decrementButton);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

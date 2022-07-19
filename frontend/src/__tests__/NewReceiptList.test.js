import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NewReceiptList } from "../components/ReceiptLists/NewReceiptList/NewReceiptList";

describe("input value", () => {
  it("updates on change", () => {
    const { createReceiptListPlaceHolderText } = render(<NewReceiptList />);
    const searchInput = createReceiptListPlaceHolderText.getByLabelText("Receipt List Name");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  })
})
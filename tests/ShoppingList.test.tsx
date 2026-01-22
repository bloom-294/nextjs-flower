/* eslint-env jest */ 

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ShoppingList } from "../components/Organisms/shoppingList"; // adjust path to your component

const mockItems = [
  {
    "id": 1,
    "name": "アレンジメント",
    "price": "1200",
    "imagePath": "/bouquet-red-bin.jpg",
  },
  {
    "id": 2,
    "name": "黄色いチューリップ",
    "price": "900",
    "imagePath": "/bouquet-red-bin.jpg",
  },
];

beforeEach(() => {
  (global as any).fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockItems),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders items fetched from API", async () => {
  render(<ShoppingList />);

  await waitFor(() => {
    expect(screen.getByText("アレンジメント")).toBeInTheDocument();
    expect(screen.getByText("黄色いチューリップ")).toBeInTheDocument();
  });
});
